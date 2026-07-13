import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CustomerStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getProfile(customerId: number) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    // Remove sensitive data
    const {
      passwordHash: _ph,
      hashedRefreshToken: _hrt,
      isDeleted: _id,
      ...safeCustomer
    } = customer;
    return safeCustomer;
  }

  async getAllCustomers() {
    const customers = await this.prisma.customer.findMany({
      where: { isDeleted: false },
      include: {
        tags: { include: { tag: true } },
        notes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return customers.map((c) => {
      const {
        passwordHash: _ph,
        hashedRefreshToken: _hrt,
        isDeleted: _id,
        ...safeCustomer
      } = c;
      return safeCustomer;
    });
  }

  async updateProfile(customerId: number, updateDto: UpdateProfileDto) {
    const updated = await this.customerRepository.update(customerId, updateDto);
    const {
      passwordHash: _ph,
      hashedRefreshToken: _hrt,
      isDeleted: _id,
      ...safeCustomer
    } = updated;
    return safeCustomer;
  }

  async softDeleteAccount(customerId: number) {
    await this.customerRepository.update(customerId, { isDeleted: true });
    return { message: 'Account deleted successfully' };
  }

  async resetPasswordAdmin(customerId: number, newPassword?: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId, isDeleted: false },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    // Generate a random 8-digit password if not provided
    const passwordToSet = newPassword || Math.floor(10000000 + Math.random() * 90000000).toString();
    const passwordHash = await bcrypt.hash(passwordToSet, 10);

    await this.customerRepository.update(customerId, { passwordHash });

    return { 
      message: 'Password reset successfully', 
      newPassword: passwordToSet,
      phone: customer.phone
    };
  }

  async getAdminCustomerDetails(customerId: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId, isDeleted: false },
      include: {
        addresses: { where: { isDeleted: false } },
        favorites: { include: { product: true } },
        tags: { include: { tag: true } },
        notes: { orderBy: { createdAt: 'desc' } },
        orders: { orderBy: { createdAt: 'desc' } },
        loyaltyHistory: { orderBy: { createdAt: 'desc' } },
        couponUsages: {
          include: { coupon: true },
          orderBy: { usedAt: 'desc' },
        },
      },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    const {
      passwordHash: _ph,
      hashedRefreshToken: _hrt,
      isDeleted: _id,
      ...safeCustomer
    } = customer;

    let riskScore = 'Low Risk';
    if (
      safeCustomer.status === CustomerStatus.BLOCKED ||
      safeCustomer.cancelledOrders >= 5
    ) {
      riskScore = 'High Risk';
    } else if (safeCustomer.cancelledOrders >= 2) {
      riskScore = 'Medium Risk';
    }

    const segments = [];
    const daysSinceRegistration =
      (new Date().getTime() - safeCustomer.createdAt.getTime()) /
      (1000 * 3600 * 24);
    if (daysSinceRegistration < 7) segments.push('New Customer');
    if (safeCustomer.status === CustomerStatus.VIP)
      segments.push('VIP Customer');
    if (safeCustomer.lastOrderDate) {
      const daysSinceLastOrder =
        (new Date().getTime() - safeCustomer.lastOrderDate.getTime()) /
        (1000 * 3600 * 24);
      if (daysSinceLastOrder > 30) segments.push('Inactive Customer');
    }
    if (Number(safeCustomer.totalSpent) > 500) segments.push('High Spending');
    if (safeCustomer.completedOrders > 5) segments.push('Frequent Customer');
    if (safeCustomer.cancelledOrders >= 2) segments.push('Many Cancellations');
    if (safeCustomer.status === CustomerStatus.BLOCKED)
      segments.push('Blocked Customer');

    const totalLoyaltyEarned = safeCustomer.loyaltyHistory
      .filter((l) => l.type === 'EARN')
      .reduce((sum, l) => sum + l.points, 0);
    const averageOrderValue =
      safeCustomer.completedOrders > 0
        ? Number(safeCustomer.totalSpent) / safeCustomer.completedOrders
        : 0;

    return {
      ...safeCustomer,
      riskScore,
      segments,
      statistics: {
        totalLoyaltyEarned,
        totalCouponsUsed: safeCustomer.couponUsages.length,
        averageOrderValue,
      },
    };
  }

  async getCustomerTimeline(customerId: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        orders: true,
        loyaltyHistory: true,
        couponUsages: { include: { coupon: true } },
        notes: true,
      },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    const timeline = [];

    timeline.push({
      type: 'REGISTRATION',
      date: customer.createdAt,
      description: 'Customer registered account',
      action: 'Registration',
    });

    customer.orders.forEach((o) => {
      timeline.push({
        type: 'ORDER',
        date: o.createdAt,
        description: `Placed order ${o.orderCode} for $${o.grandTotal.toString()}`,
        action: 'Placed Order',
      });
    });

    customer.loyaltyHistory.forEach((l) => {
      timeline.push({
        type: 'LOYALTY',
        date: l.createdAt,
        description: `${l.type === 'EARN' ? 'Earned' : 'Redeemed'} ${l.points} points`,
        action: `Loyalty ${l.type}`,
      });
    });

    customer.couponUsages.forEach((c) => {
      timeline.push({
        type: 'COUPON',
        date: c.usedAt,
        description: `Used coupon ${c.coupon.code}`,
        action: 'Coupon Usage',
      });
    });

    customer.notes.forEach((n) => {
      timeline.push({
        type: 'NOTE',
        date: n.createdAt,
        description: `Added note: ${n.note}`,
        action: 'Note Added',
        user: n.createdBy,
      });
    });

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return timeline;
  }

  async updateCustomerStatus(customerId: number, status: CustomerStatus) {
    return this.prisma.customer.update({
      where: { id: customerId },
      data: { status },
      select: { id: true, status: true },
    });
  }
}
