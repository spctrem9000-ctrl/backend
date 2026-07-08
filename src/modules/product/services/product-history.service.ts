import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { ActivityAction } from '@prisma/client';

@Injectable()
export class ProductHistoryService {
  private readonly logger = new Logger(ProductHistoryService.name);

  constructor(private prisma: PrismaService) {}

  async logAction(
    productId: number,
    action: ActivityAction,
    adminId: string,
    details?: any,
  ) {
    try {
      await this.prisma.productActivityLog.create({
        data: {
          productId,
          action,
          adminId,
          details: details ? JSON.parse(JSON.stringify(details)) : undefined,
        },
      });
    } catch (err) {
      const e = err as Error;
      this.logger.error(
        `Failed to log activity ${action} for product ${productId}`,
        e.stack,
      );
    }
  }

  async recordPriceChange(
    productId: number,
    oldPrice: number,
    newPrice: number,
    adminId: string,
    reason?: string,
  ) {
    try {
      await this.prisma.productPriceHistory.create({
        data: {
          productId,
          oldPrice,
          newPrice,
          changedBy: adminId,
          reason,
        },
      });
      await this.logAction(productId, ActivityAction.PRICE_CHANGE, adminId, {
        oldPrice,
        newPrice,
        reason,
      });
    } catch (err) {
      const e = err as Error;
      this.logger.error(
        `Failed to record price change for product ${productId}`,
        e.stack,
      );
    }
  }
}
