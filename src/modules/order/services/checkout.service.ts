import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CartService } from '../../cart/services/cart.service';
import { OrderNotificationService } from './order-notification.service';
import { CheckoutDto } from '../dto/checkout.dto';
import { OrderType, OrderAction, CustomerStatus } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class CheckoutService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private notificationService: OrderNotificationService,
  ) {}

  async checkout(customerId: number, dto: CheckoutDto) {
    // 1. Verify Customer status
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) throw new BadRequestException('Customer not found');
    if (customer.status === CustomerStatus.BLOCKED) {
      throw new BadRequestException(
        'Your account has been blocked. Please contact support.',
      );
    }

    // 2. Fetch Calculated Cart
    const cart = await this.cartService.getCart(customerId);
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 3. Validate Address if Delivery
    if (dto.orderType === OrderType.DELIVERY) {
      if (!dto.addressId)
        throw new BadRequestException(
          'Delivery address is required for delivery orders',
        );
      const address = await this.prisma.address.findFirst({
        where: { id: dto.addressId, customerId },
      });
      if (!address) throw new BadRequestException('Invalid delivery address');
    }

    // 4. Validate Availability (Already checked implicitly during cart calculation, but let's double check)
    for (const item of cart.items) {
      if (!item.product.isAvailable)
        throw new BadRequestException(
          `Product ${item.product.nameEn} is unavailable`,
        );
      for (const e of item.extras) {
        if (!e.extra.isAvailable)
          throw new BadRequestException(
            `Extra ${e.extra.nameEn} is unavailable`,
          );
      }
    }

    // 5. Generate OrderCode
    const orderCode = `ORD-${randomBytes(3).toString('hex').toUpperCase()}`;

    // 6. Execute Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          orderCode,
          customerId,
          addressId:
            dto.orderType === OrderType.DELIVERY ? dto.addressId : null,
          orderType: dto.orderType,
          paymentMethod: dto.paymentMethod,
          subtotal: cart.subtotal,
          discount: cart.discount,
          couponDiscount: cart.couponDiscount,
          loyaltyDiscount: cart.loyaltyDiscount,
          deliveryFees: cart.deliveryFees,
          grandTotal: cart.grandTotal,
          couponId: cart.couponId,
          orderNotes: dto.orderNotes,
          items: {
            create: cart.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.product.discountPrice || item.product.basePrice,
              totalPrice: item.calculatedTotal,
              extras: {
                create: item.extras.map((e: any) => ({
                  extraId: e.extraId,
                  price: e.extra.price,
                })),
              },
            })),
          },
          statusHistory: {
            create: {
              newStatus: 'PENDING',
              changedBy: customer.guid,
            },
          },
          activityLogs: {
            create: {
              action: OrderAction.CREATE,
              customerId: customer.guid,
            },
          },
        },
      });

      // Clear the cart completely
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.update({
        where: { id: cart.id },
        data: { couponId: null, loyaltyPointsApplied: 0 },
      });

      // Update customer stats
      await tx.customer.update({
        where: { id: customerId },
        data: { totalOrders: { increment: 1 } },
      });

      return createdOrder;
    });

    // 7. Notify
    await this.notificationService.notifyNewOrder(order.id, order.orderCode);

    return order;
  }
}
