import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async getAdminCoupons() {
    return this.prisma.coupon.findMany({
      include: {
        targetProducts: {
          include: { product: { select: { id: true, nameEn: true } } },
        },
        targetCategories: {
          include: { category: { select: { id: true, nameEn: true } } },
        },
        targetCustomers: {
          include: {
            customer: { select: { id: true, name: true, phone: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCoupon(data: any) {
    try {
      const { productIds, categoryIds, customerIds, ...rest } = data;

      return await this.prisma.coupon.create({
        data: {
          ...rest,
          targetProducts: productIds?.length
            ? {
                create: productIds.map((id: number) => ({ productId: id })),
              }
            : undefined,
          targetCategories: categoryIds?.length
            ? {
                create: categoryIds.map((id: number) => ({ categoryId: id })),
              }
            : undefined,
          targetCustomers: customerIds?.length
            ? {
                create: customerIds.map((id: number) => ({ customerId: id })),
              }
            : undefined,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('A coupon with this code already exists.');
      }
      throw error;
    }
  }

  async updateCoupon(id: number, data: any) {
    const { productIds, categoryIds, customerIds, ...rest } = data;

    // Delete existing relations to overwrite
    if (productIds !== undefined)
      await this.prisma.couponProduct.deleteMany({ where: { couponId: id } });
    if (categoryIds !== undefined)
      await this.prisma.couponCategory.deleteMany({ where: { couponId: id } });
    if (customerIds !== undefined)
      await this.prisma.couponCustomer.deleteMany({ where: { couponId: id } });

    return this.prisma.coupon.update({
      where: { id },
      data: {
        ...rest,
        targetProducts: productIds?.length
          ? {
              create: productIds.map((pid: number) => ({ productId: pid })),
            }
          : undefined,
        targetCategories: categoryIds?.length
          ? {
              create: categoryIds.map((cid: number) => ({ categoryId: cid })),
            }
          : undefined,
        targetCustomers: customerIds?.length
          ? {
              create: customerIds.map((cid: number) => ({ customerId: cid })),
            }
          : undefined,
      },
    });
  }

  async deleteCoupon(id: number) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
