import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus, NotificationType } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class OrderNotificationService {
  private readonly logger = new Logger(OrderNotificationService.name);

  constructor(private prisma: PrismaService) {}

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

  async sendNotificationToCustomer(
    customerId: number,
    titleAr: string,
    messageAr: string,
    type: NotificationType = NotificationType.GENERAL,
  ) {
    this.logger.log(`[NOTIFICATION] Sending to customer ${customerId}: ${titleAr}`);
    await this.prisma.notification.create({
      data: {
        customerId,
        titleAr,
        titleEn: titleAr, // Fallback if no English provided
        messageAr,
        messageEn: messageAr,
        type,
      },
    });
  }
}
