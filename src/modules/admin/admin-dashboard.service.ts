import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      todaysOrders,
      todaysRevenueResult,
      pendingOrders,
      latestOrders,
      topProducts,
    ] = await Promise.all([
      this.prisma.order.count({
        where: { createdAt: { gte: today } },
      }),
      this.prisma.order.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { grandTotal: true },
      }),
      this.prisma.order.count({
        where: { status: 'PENDING' },
      }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: { select: { name: true } } },
      }),
      this.prisma.productInsight.findMany({
        take: 5,
        orderBy: { purchased: 'desc' },
        include: { product: { select: { nameEn: true, nameAr: true, mainImage: true, id: true } } },
      }),
    ]);

    return {
      todaysOrders,
      todaysRevenue: todaysRevenueResult._sum.grandTotal || 0,
      pendingOrders,
      lowStock: 0,
      latestOrders: latestOrders.map((o) => ({
        id: o.id,
        orderCode: o.orderCode,
        customerName: o.customer.name,
        amount: Number(o.grandTotal),
        createdAt: o.createdAt,
      })),
      topProducts: topProducts.map((p) => ({
        id: p.product.id,
        name: p.product.nameEn || p.product.nameAr,
        image: p.product.mainImage,
        sales: p.purchased,
      })),
    };
  }
}
