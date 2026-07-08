import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderNotificationService {
  private readonly logger = new Logger(OrderNotificationService.name);

  async notifyNewOrder(orderId: number, orderCode: string) {
    this.logger.log(
      `[NOTIFICATION] New Order Placed: ${orderCode} (ID: ${orderId})`,
    );
    return Promise.resolve();
  }

  async notifyStatusChange(
    orderId: number,
    orderCode: string,
    newStatus: OrderStatus,
  ) {
    this.logger.log(
      `[NOTIFICATION] Order ${orderCode} status changed to ${newStatus}`,
    );
    return Promise.resolve();
  }

  async notifyOrderCancelled(orderId: number, orderCode: string) {
    this.logger.log(`[NOTIFICATION] Order ${orderCode} was cancelled`);
    return Promise.resolve();
  }
}
