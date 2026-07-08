const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ----------------------
// Cart Module
// ----------------------
const cartDir = 'D:/Menu/backend/src/modules/cart';
ensureDir(cartDir);
ensureDir(path.join(cartDir, 'controllers'));
ensureDir(path.join(cartDir, 'services'));
ensureDir(path.join(cartDir, 'dto'));

fs.writeFileSync(path.join(cartDir, 'cart.module.ts'), `import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CustomerCartController } from './controllers/customer-cart.controller';

@Module({
  controllers: [CustomerCartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
`);

fs.writeFileSync(path.join(cartDir, 'dto', 'cart.dto.ts'), `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min, IsArray, IsOptional, ValidateNested, IsString } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  extraIds?: number[];
}

export class UpdateCartItemQuantityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class ApplyCouponDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}
`);

fs.writeFileSync(path.join(cartDir, 'services', 'cart.service.ts'), `import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { customerId },
        include: { items: { include: { product: true, extras: { include: { extra: true } } } }, coupon: true },
      });
    }

    return this.calculateTotals(cart);
  }

  async addItem(customerId: number, dto: AddCartItemDto) {
    const cart = await this.getCart(customerId);
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    
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
        extras: dto.extraIds && dto.extraIds.length > 0 ? {
          create: dto.extraIds.map(eId => ({ extraId: eId }))
        } : undefined
      }
    });

    return this.getCart(customerId);
  }

  async removeItem(customerId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({ where: { id: cartItemId, cartId: cart.id } });
    if (!item) throw new NotFoundException('Item not found in cart');

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return this.getCart(customerId);
  }

  async updateQuantity(customerId: number, cartItemId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({ where: { id: cartItemId, cartId: cart.id } });
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
        data: { couponId: null, loyaltyPointsApplied: 0 }
      });
    }
    return this.getCart(customerId);
  }

  async applyCoupon(customerId: number, code: string) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive || (coupon.expiryDate && coupon.expiryDate < new Date())) {
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
        data: { couponId: null }
      });
    }
    return this.getCart(customerId);
  }

  private calculateTotals(cart: any) {
    let subtotal = 0;
    
    // Calculate items
    const processedItems = cart.items.map(item => {
      const pPrice = Number(item.product.discountPrice || item.product.basePrice);
      const extrasPrice = item.extras.reduce((sum, e) => sum + Number(e.extra.price), 0);
      const unitTotal = pPrice + extrasPrice;
      const total = unitTotal * item.quantity;
      subtotal += total;
      
      return {
        ...item,
        calculatedPrice: unitTotal,
        calculatedTotal: total
      };
    });

    let discount = 0;
    let couponDiscount = 0;
    let loyaltyDiscount = 0;
    
    // Apply Coupon
    if (cart.coupon) {
      const discountPercentage = Number(cart.coupon.discountPercent) / 100;
      let calculatedCouponDiscount = subtotal * discountPercentage;
      
      if (cart.coupon.maxDiscountAmount) {
        const max = Number(cart.coupon.maxDiscountAmount);
        if (calculatedCouponDiscount > max) {
          calculatedCouponDiscount = max;
        }
      }
      couponDiscount = calculatedCouponDiscount;
      discount += couponDiscount;
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
      grandTotal
    };
  }
}
`);

fs.writeFileSync(path.join(cartDir, 'controllers', 'customer-cart.controller.ts'), `import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { AddCartItemDto, UpdateCartItemQuantityDto, ApplyCouponDto } from '../dto/cart.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Cart')
@Controller('customer/cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerCartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current cart' })
  getCart(@CurrentUser() user: { id: number }) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  addItem(@CurrentUser() user: { id: number }, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(user.id, dto);
  }

  @Put('items/:itemId/quantity')
  @ApiOperation({ summary: 'Update item quantity' })
  updateQuantity(
    @CurrentUser() user: { id: number },
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemQuantityDto,
  ) {
    return this.cartService.updateQuantity(user.id, itemId, dto.quantity);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(@CurrentUser() user: { id: number }, @Param('itemId', ParseIntPipe) itemId: number) {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@CurrentUser() user: { id: number }) {
    return this.cartService.clearCart(user.id);
  }

  @Post('coupon')
  @ApiOperation({ summary: 'Apply coupon' })
  applyCoupon(@CurrentUser() user: { id: number }, @Body() dto: ApplyCouponDto) {
    return this.cartService.applyCoupon(user.id, dto.code);
  }

  @Delete('coupon')
  @ApiOperation({ summary: 'Remove coupon' })
  removeCoupon(@CurrentUser() user: { id: number }) {
    return this.cartService.removeCoupon(user.id);
  }
}
`);

// ----------------------
// Order Module
// ----------------------
const orderDir = 'D:/Menu/backend/src/modules/order';
ensureDir(orderDir);
ensureDir(path.join(orderDir, 'controllers'));
ensureDir(path.join(orderDir, 'services'));
ensureDir(path.join(orderDir, 'dto'));

fs.writeFileSync(path.join(orderDir, 'order.module.ts'), `import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { CheckoutService } from './services/checkout.service';
import { OrderNotificationService } from './services/order-notification.service';
import { CustomerOrderController } from './controllers/customer-order.controller';
import { AdminOrderController } from './controllers/admin-order.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [CustomerOrderController, AdminOrderController],
  providers: [OrderService, CheckoutService, OrderNotificationService],
  exports: [OrderService, CheckoutService],
})
export class OrderModule {}
`);

fs.writeFileSync(path.join(orderDir, 'dto', 'checkout.dto.ts'), `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderType, PaymentMethod } from '@prisma/client';

export class CheckoutDto {
  @ApiProperty({ enum: OrderType })
  @IsNotEmpty()
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ enum: PaymentMethod })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  addressId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderNotes?: string;
}
`);

fs.writeFileSync(path.join(orderDir, 'dto', 'order-filter.dto.ts'), `import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus, OrderType, PaymentMethod } from '@prisma/client';

export class OrderFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string; // Search orderCode, customer name, phone

  @ApiPropertyOptional({ enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ enum: OrderType })
  @IsOptional()
  @IsEnum(OrderType)
  orderType?: OrderType;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}
`);

fs.writeFileSync(path.join(orderDir, 'dto', 'order-status.dto.ts'), `import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
`);

fs.writeFileSync(path.join(orderDir, 'services', 'order-notification.service.ts'), `import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderNotificationService {
  private readonly logger = new Logger(OrderNotificationService.name);

  async notifyNewOrder(orderId: number, orderCode: string) {
    this.logger.log(\`[NOTIFICATION] New Order Placed: \${orderCode} (ID: \${orderId})\`);
    // Future: Emit websocket event, send email/SMS
  }

  async notifyStatusChange(orderId: number, orderCode: string, newStatus: OrderStatus) {
    this.logger.log(\`[NOTIFICATION] Order \${orderCode} status changed to \${newStatus}\`);
    // Future: Push notification to customer
  }

  async notifyOrderCancelled(orderId: number, orderCode: string) {
    this.logger.log(\`[NOTIFICATION] Order \${orderCode} was cancelled\`);
  }
}
`);

fs.writeFileSync(path.join(orderDir, 'services', 'checkout.service.ts'), `import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CartService } from '../../cart/services/cart.service';
import { OrderNotificationService } from './order-notification.service';
import { CheckoutDto } from '../dto/checkout.dto';
import { OrderType, PaymentMethod, OrderAction, CustomerStatus } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class CheckoutService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private notificationService: OrderNotificationService
  ) {}

  async checkout(customerId: number, dto: CheckoutDto) {
    // 1. Verify Customer status
    const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw new BadRequestException('Customer not found');
    if (customer.status === CustomerStatus.GUEST || customer.status === CustomerStatus.UNVERIFIED) {
      throw new BadRequestException('Guest/Unverified customers cannot place orders. Please verify account.');
    }

    // 2. Fetch Calculated Cart
    const cart = await this.cartService.getCart(customerId);
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 3. Validate Address if Delivery
    if (dto.orderType === OrderType.DELIVERY) {
      if (!dto.addressId) throw new BadRequestException('Delivery address is required for delivery orders');
      const address = await this.prisma.address.findFirst({ where: { id: dto.addressId, customerId } });
      if (!address) throw new BadRequestException('Invalid delivery address');
    }

    // 4. Validate Availability (Already checked implicitly during cart calculation, but let's double check)
    for (const item of cart.items) {
      if (!item.product.isAvailable) throw new BadRequestException(\`Product \${item.product.nameEn} is unavailable\`);
      for (const e of item.extras) {
        if (!e.extra.isAvailable) throw new BadRequestException(\`Extra \${e.extra.nameEn} is unavailable\`);
      }
    }

    // 5. Generate OrderCode
    const orderCode = \`ORD-\${randomBytes(3).toString('hex').toUpperCase()}\`;

    // 6. Execute Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          orderCode,
          customerId,
          addressId: dto.orderType === OrderType.DELIVERY ? dto.addressId : null,
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
                }))
              }
            }))
          },
          statusHistory: {
            create: {
              newStatus: 'PENDING',
              changedBy: customer.guid
            }
          },
          activityLogs: {
            create: {
              action: OrderAction.CREATE,
              customerId: customer.guid
            }
          }
        }
      });

      // Clear the cart completely
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.update({
        where: { id: cart.id },
        data: { couponId: null, loyaltyPointsApplied: 0 }
      });

      // Update customer stats
      await tx.customer.update({
        where: { id: customerId },
        data: { totalOrders: { increment: 1 } }
      });

      return createdOrder;
    });

    // 7. Notify
    await this.notificationService.notifyNewOrder(order.id, order.orderCode);

    return order;
  }
}
`);

fs.writeFileSync(path.join(orderDir, 'services', 'order.service.ts'), `import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { OrderNotificationService } from './order-notification.service';
import { OrderFilterDto } from '../dto/order-filter.dto';
import { OrderStatus, OrderAction } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private notificationService: OrderNotificationService
  ) {}

  // ==========================
  // CUSTOMER METHODS
  // ==========================

  async getCustomerOrders(customerId: number) {
    return this.prisma.order.findMany({
      where: { customerId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } }
    });
  }

  async getCustomerOrderDetails(customerId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, customerId, isDeleted: false },
      include: {
        items: { include: { product: true, extras: { include: { extra: true } } } },
        address: true,
        statusHistory: { orderBy: { createdAt: 'desc' } }
      }
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrderCustomer(customerId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, customerId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }

    const customer = await this.prisma.customer.findUnique({ where: { id: customerId }});

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        statusHistory: { create: { oldStatus: order.status, newStatus: OrderStatus.CANCELLED, changedBy: customer!.guid } },
        activityLogs: { create: { action: OrderAction.CANCEL, customerId: customer!.guid } }
      }
    });

    await this.notificationService.notifyOrderCancelled(updated.id, updated.orderCode);
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
        { customer: { name: { contains: filters.query, mode: 'insensitive' } } },
        { customer: { phone: { contains: filters.query } } },
      ];
    }

    return this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { customer: { select: { name: true, phone: true } }, address: true }
    });
  }

  async getAdminOrderDetails(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, isDeleted: false },
      include: {
        customer: true,
        items: { include: { product: true, extras: { include: { extra: true } } } },
        address: true,
        statusHistory: { orderBy: { createdAt: 'desc' } },
        activityLogs: { orderBy: { createdAt: 'desc' } }
      }
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async changeOrderStatus(orderId: number, newStatus: OrderStatus, adminId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    
    if (order.status === newStatus) return order;

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        statusHistory: { create: { oldStatus: order.status, newStatus, changedBy: adminId } },
        activityLogs: { create: { action: OrderAction.STATUS_CHANGE, adminId, details: { old: order.status, new: newStatus } } }
      }
    });

    await this.notificationService.notifyStatusChange(updated.id, updated.orderCode, newStatus);
    return updated;
  }
}
`);

fs.writeFileSync(path.join(orderDir, 'controllers', 'customer-order.controller.ts'), `import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutDto } from '../dto/checkout.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Orders & Checkout')
@Controller('customer/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerOrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly checkoutService: CheckoutService
  ) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Create an order from cart' })
  checkout(@CurrentUser() user: { id: number }, @Body() dto: CheckoutDto) {
    return this.checkoutService.checkout(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get order history' })
  getOrders(@CurrentUser() user: { id: number }) {
    return this.orderService.getCustomerOrders(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details and tracking' })
  getOrderDetails(@CurrentUser() user: { id: number }, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.getCustomerOrderDetails(user.id, id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel order (only if Pending)' })
  cancelOrder(@CurrentUser() user: { id: number }, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.cancelOrderCustomer(user.id, id);
  }
}
`);

fs.writeFileSync(path.join(orderDir, 'controllers', 'admin-order.controller.ts'), `import { Controller, Get, Patch, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { OrderFilterDto } from '../dto/order-filter.dto';
import { UpdateOrderStatusDto } from '../dto/order-status.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Admin Orders')
@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Search and filter orders' })
  getOrders(@Query() filters: OrderFilterDto) {
    return this.orderService.getOrders(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full order details, history, and activity log' })
  getOrderDetails(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getAdminOrderDetails(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change order status' })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
    @CurrentUser() user: { id: string }
  ) {
    return this.orderService.changeOrderStatus(id, dto.status, user.id);
  }
}
`);

// Add CartModule and OrderModule to app.module.ts
const appModule = 'D:/Menu/backend/src/app.module.ts';
let am = fs.readFileSync(appModule, 'utf8');
am = am.replace(/import { ProductModule } from '.\/modules\/product\/product.module';/, "import { ProductModule } from './modules/product/product.module';\nimport { CartModule } from './modules/cart/cart.module';\nimport { OrderModule } from './modules/order/order.module';");
am = am.replace(/ProductModule,/, "ProductModule,\n    CartModule,\n    OrderModule,");
fs.writeFileSync(appModule, am);

console.log('Order and Cart Modules generated successfully.');
