import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async getBalance(customerId: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return { points: customer.loyaltyPoints };
  }

  async getHistory(customerId: number) {
    return this.prisma.loyaltyTransaction.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Internal method to add points after successful order
  async earnPoints(customerId: number, points: number, orderId?: number) {
    await this.prisma.$transaction([
      this.prisma.loyaltyTransaction.create({
        data: { customerId, points, type: 'EARN', orderId },
      }),
      this.prisma.customer.update({
        where: { id: customerId },
        data: { loyaltyPoints: { increment: points } },
      }),
    ]);
  }

  // Internal method to deduct points
  async redeemPoints(customerId: number, points: number, orderId?: number) {
    await this.prisma.$transaction([
      this.prisma.loyaltyTransaction.create({
        data: { customerId, points: -points, type: 'REDEEM', orderId },
      }),
      this.prisma.customer.update({
        where: { id: customerId },
        data: { loyaltyPoints: { decrement: points } },
      }),
    ]);
  }

  async getConfig() {
    const setting = await this.prisma.setting.findUnique({
      where: { key: 'LOYALTY_CONFIG' },
    });
    if (!setting) {
      return {
        enabled: false,
        pointsPerCurrency: 1,
        minRedeem: 100,
        maxRedeem: 1000,
        pointValue: 0.01,
      };
    }
    return setting.value;
  }

  async updateConfig(config: any) {
    return this.prisma.setting.upsert({
      where: { key: 'LOYALTY_CONFIG' },
      update: { value: config },
      create: { key: 'LOYALTY_CONFIG', value: config },
    });
  }

  async getAllTransactions() {
    return this.prisma.loyaltyTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: { select: { name: true, phone: true } } },
    });
  }

  async manualAdjustment(data: {
    customerId: number;
    points: number;
    reason: string;
    adminId?: string;
  }) {
    await this.prisma.$transaction([
      this.prisma.loyaltyTransaction.create({
        data: {
          customerId: data.customerId,
          points: data.points,
          type: 'ADJUSTMENT',
          reason: data.reason,
          adminId: data.adminId,
        },
      }),
      this.prisma.customer.update({
        where: { id: data.customerId },
        data: { loyaltyPoints: { increment: data.points } },
      }),
    ]);
    return { success: true };
  }
}
