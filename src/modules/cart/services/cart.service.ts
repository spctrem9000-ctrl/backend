import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AddCartItemDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(customerId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { customerId },
      include: {
        items: {
          include: {
            product: true,
            extras: { include: { extra: true } },
          },
        },
        coupon: true,
        customer: { select: { loyaltyPoints: true } },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { customerId },
        include: {
          items: {
            include: { product: true, extras: { include: { extra: true } } },
          },
          coupon: true,
          customer: { select: { loyaltyPoints: true } },
        },
      });
    }

    return this.calculateTotals(cart);
  }

  async addItem(customerId: number, dto: AddCartItemDto) {
    const cart = await this.getCart(customerId);
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product || !product.isAvailable) {
      throw new BadRequestException('Product is not available');
    }

    // Determine if exact item with same extras already exists
    // Omitted complex matching logic for brevity; we create a new cart item

    await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
        extras:
          dto.extraIds && dto.extraIds.length > 0
            ? {
                create: dto.extraIds.map((eId) => ({ extraId: eId })),
              }
            : undefined,
      },
    });

    return this.getCart(customerId);
  }

  async removeItem(customerId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Item not found in cart');

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return this.getCart(customerId);
  }

  async updateQuantity(
    customerId: number,
    cartItemId: number,
    quantity: number,
  ) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id },
    });
    if (!item) throw new NotFoundException('Item not found in cart');

    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
    return this.getCart(customerId);
  }

  async clearCart(customerId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (cart) {
      await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      await this.prisma.cart.update({
        where: { id: cart.id },
        data: { couponId: null, loyaltyPointsApplied: 0 },
      });
    }
    return this.getCart(customerId);
  }

  async applyCoupon(customerId: number, code: string) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (
      !coupon ||
      !coupon.isActive ||
      (coupon.validTo && coupon.validTo < new Date()) ||
      (coupon.validFrom && coupon.validFrom > new Date())
    ) {
      throw new BadRequestException('Invalid or expired coupon');
    }

    await this.prisma.cart.update({
      where: { id: cart.id },
      data: { couponId: coupon.id },
    });

    return this.getCart(customerId);
  }

  async removeCoupon(customerId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (cart) {
      await this.prisma.cart.update({
        where: { id: cart.id },
        data: { couponId: null },
      });
    }
    return this.getCart(customerId);
  }

  async toggleLoyalty(customerId: number, redeem: boolean) {
    const cart = await this.prisma.cart.findUnique({
      where: { customerId },
      include: { customer: true },
    });
    if (!cart) throw new NotFoundException('Cart not found');

    const pointsToApply = redeem ? cart.customer.loyaltyPoints : 0;

    await this.prisma.cart.update({
      where: { id: cart.id },
      data: { loyaltyPointsApplied: pointsToApply },
    });

    return this.getCart(customerId);
  }

  private calculateTotals(cart: any) {
    let subtotal = 0;

    // Calculate items
    const processedItems = cart.items.map((item: any) => {
      const pPrice = Number(
        item.product.discountPrice || item.product.basePrice,
      );
      const extrasPrice = item.extras.reduce(
        (sum: number, e: any) => sum + Number(e.extra.price),
        0,
      );
      const unitTotal = pPrice + extrasPrice;
      const total = unitTotal * item.quantity;
      subtotal += total;

      return {
        ...item,
        calculatedPrice: unitTotal,
        calculatedTotal: total,
      };
    });

    let discount = 0;
    let couponDiscount = 0;
    let loyaltyDiscount = 0;

    // Apply Coupon
    if (cart.coupon) {
      if (cart.coupon.couponType === 'PERCENTAGE') {
        const discountPercentage = Number(cart.coupon.discountPercent) / 100;
        let calculatedCouponDiscount = subtotal * discountPercentage;

        if (cart.coupon.maxDiscountAmount) {
          const max = Number(cart.coupon.maxDiscountAmount);
          if (calculatedCouponDiscount > max) {
            calculatedCouponDiscount = max;
          }
        }
        couponDiscount = calculatedCouponDiscount;
      } else if (cart.coupon.couponType === 'FIXED_AMOUNT') {
        couponDiscount = Number(cart.coupon.fixedDiscount);
      }
      discount += couponDiscount;
    }

    // Apply Loyalty Points
    if (cart.loyaltyPointsApplied > 0 && cart.customer) {
      let maxPoints = cart.customer.loyaltyPoints;
      // Ensure we don't apply more points than the remaining subtotal (after coupon)
      const maxDiscountNeeded = subtotal - discount;
      const maxPointsNeeded = Math.ceil(maxDiscountNeeded * 100); // 100 points = 1 EGP
      if (maxPoints > maxPointsNeeded) {
        maxPoints = maxPointsNeeded;
      }
      
      let appliedPoints = cart.loyaltyPointsApplied;
      if (appliedPoints > maxPoints) {
        appliedPoints = maxPoints;
      }

      loyaltyDiscount = appliedPoints / 100;
      discount += loyaltyDiscount;
      
      // Update cart object to reflect the actual applied points
      cart.loyaltyPointsApplied = appliedPoints;
    }

    const deliveryFees = 0; // Mock delivery fees for now or calculate based on settings
    let grandTotal = subtotal - discount + deliveryFees;
    if (grandTotal < 0) grandTotal = 0;

    return {
      ...cart,
      items: processedItems,
      subtotal,
      discount,
      couponDiscount,
      loyaltyDiscount,
      deliveryFees,
      grandTotal,
    };
  }
}
