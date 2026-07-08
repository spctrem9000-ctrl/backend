"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const cart_service_1 = require("../../cart/services/cart.service");
const order_notification_service_1 = require("./order-notification.service");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let CheckoutService = class CheckoutService {
    prisma;
    cartService;
    notificationService;
    constructor(prisma, cartService, notificationService) {
        this.prisma = prisma;
        this.cartService = cartService;
        this.notificationService = notificationService;
    }
    async checkout(customerId, dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer)
            throw new common_1.BadRequestException('Customer not found');
        if (customer.status === client_1.CustomerStatus.GUEST ||
            customer.status === client_1.CustomerStatus.UNVERIFIED) {
            throw new common_1.BadRequestException('Guest/Unverified customers cannot place orders. Please verify account.');
        }
        const cart = await this.cartService.getCart(customerId);
        if (!cart.items || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        if (dto.orderType === client_1.OrderType.DELIVERY) {
            if (!dto.addressId)
                throw new common_1.BadRequestException('Delivery address is required for delivery orders');
            const address = await this.prisma.address.findFirst({
                where: { id: dto.addressId, customerId },
            });
            if (!address)
                throw new common_1.BadRequestException('Invalid delivery address');
        }
        for (const item of cart.items) {
            if (!item.product.isAvailable)
                throw new common_1.BadRequestException(`Product ${item.product.nameEn} is unavailable`);
            for (const e of item.extras) {
                if (!e.extra.isAvailable)
                    throw new common_1.BadRequestException(`Extra ${e.extra.nameEn} is unavailable`);
            }
        }
        const orderCode = `ORD-${(0, crypto_1.randomBytes)(3).toString('hex').toUpperCase()}`;
        const order = await this.prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    orderCode,
                    customerId,
                    addressId: dto.orderType === client_1.OrderType.DELIVERY ? dto.addressId : null,
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
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.product.discountPrice || item.product.basePrice,
                            totalPrice: item.calculatedTotal,
                            extras: {
                                create: item.extras.map((e) => ({
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
                            action: client_1.OrderAction.CREATE,
                            customerId: customer.guid,
                        },
                    },
                },
            });
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            await tx.cart.update({
                where: { id: cart.id },
                data: { couponId: null, loyaltyPointsApplied: 0 },
            });
            await tx.customer.update({
                where: { id: customerId },
                data: { totalOrders: { increment: 1 } },
            });
            return createdOrder;
        });
        await this.notificationService.notifyNewOrder(order.id, order.orderCode);
        return order;
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cart_service_1.CartService,
        order_notification_service_1.OrderNotificationService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map