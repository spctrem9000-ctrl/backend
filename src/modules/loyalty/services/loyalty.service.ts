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
}
