import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class ProductInsightService {
  private readonly logger = new Logger(ProductInsightService.name);

  constructor(private prisma: PrismaService) {}

  async incrementViews(productId: number) {
    try {
      await this.prisma.productInsight.upsert({
        where: { productId },
        create: { productId, views: 1 },
        update: { views: { increment: 1 } },
      });
    } catch (err) {
      const e = err as Error;
      this.logger.error(
        `Failed to increment views for product ${productId}`,
        e.stack,
      );
    }
  }

  async recordPurchase(productId: number, revenue: number) {
    try {
      const insight = await this.prisma.productInsight.upsert({
        where: { productId },
        create: { productId, purchased: 1, revenue },
        update: {
          purchased: { increment: 1 },
          revenue: { increment: revenue },
        },
      });

      // Update conversion rate async
      const views = insight.views > 0 ? insight.views : 1;
      const conversionRate = (insight.purchased / views) * 100;

      await this.prisma.productInsight.update({
        where: { productId },
        data: { conversionRate },
      });
    } catch (err) {
      const e = err as Error;
      this.logger.error(
        `Failed to record purchase for product ${productId}`,
        e.stack,
      );
    }
  }
}
