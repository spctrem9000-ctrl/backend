import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async getAdminCoupons() {
    return this.prisma.coupon.findMany({
      include: {
        targetProducts: { include: { product: true } },
        targetCategories: { include: { category: true } },
      },
    });
  }
}
