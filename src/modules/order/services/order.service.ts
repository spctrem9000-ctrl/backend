import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { OrderNotificationService } from './order-notification.service';
import { OrderFilterDto } from '../dto/order-filter.dto';
import { OrderStatus, OrderAction } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private notificationService: OrderNotificationService,
  ) {}

  // ==========================
  // CUSTOMER METHODS
  // ==========================

  async getCustomerOrders(customerId: number) {
    return this.prisma.order.findMany({
      where: { customerId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });
  }

  async getCustomerOrderDetails(customerId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, customerId, isDeleted: false },
      include: {
        items: {
          include: { product: true, extras: { include: { extra: true } } },
        },
        address: true,
        statusHistory: { orderBy: { changedAt: 'desc' } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrderCustomer(customerId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, customerId },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (
      order.status !== OrderStatus.PENDING &&
      order.status !== OrderStatus.CONFIRMED
    ) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        statusHistory: {
          create: {
            oldStatus: order.status,
            newStatus: OrderStatus.CANCELLED,
            changedBy: customer!.guid,
          },
        },
        activityLogs: {
          create: { action: OrderAction.CANCEL, customerId: customer!.guid },
        },
      },
    });

    await this.notificationService.notifyOrderCancelled(
      updated.id,
      updated.orderCode,
    );
    return updated;
  }

  // ==========================
  // ADMIN METHODS
  // ==========================

  async getOrders(filters: OrderFilterDto) {
    const where: any = { isDeleted: false };

    if (filters.status) where.status = filters.status;
    if (filters.orderType) where.orderType = filters.orderType;
    if (filters.paymentMethod) where.paymentMethod = filters.paymentMethod;
    if (filters.query) {
      where.OR = [
        { orderCode: { contains: filters.query, mode: 'insensitive' } },
        {
          customer: { name: { contains: filters.query, mode: 'insensitive' } },
        },
        { customer: { phone: { contains: filters.query } } },
      ];
    }

    return this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          include: { tags: { include: { tag: true } } }
        },
        address: true,
        items: {
          include: {
            product: { select: { nameAr: true, nameEn: true } },
            extras: {
              include: {
                extra: { select: { nameAr: true, nameEn: true, price: true } },
              },
            },
          },
        },
      },
    });
  }

  async getAdminOrderDetails(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, isDeleted: false },
      include: {
        customer: {
          include: { tags: { include: { tag: true } } }
        },
        items: {
          include: { product: true, extras: { include: { extra: true } } },
        },
        address: true,
        statusHistory: { orderBy: { changedAt: 'desc' } },
        activityLogs: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async changeOrderStatus(
    orderId: number,
    newStatus: OrderStatus,
    adminId: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.status === newStatus) return order;

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        statusHistory: {
          create: { oldStatus: order.status, newStatus, changedBy: adminId },
        },
        activityLogs: {
          create: {
            action: OrderAction.STATUS_CHANGE,
            adminId,
            details: { old: order.status, new: newStatus },
          },
        },
      },
    });

    await this.notificationService.notifyStatusChange(
      updated.id,
      updated.orderCode,
      newStatus,
    );
    return updated;
  }
}
