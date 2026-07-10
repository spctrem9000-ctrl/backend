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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(customerId) {
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
                include: {
                    items: {
                        include: { product: true, extras: { include: { extra: true } } },
                    },
                    coupon: true,
                },
            });
        }
        return this.calculateTotals(cart);
    }
    async addItem(customerId, dto) {
        const cart = await this.getCart(customerId);
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product || !product.isAvailable) {
            throw new common_1.BadRequestException('Product is not available');
        }
        await this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: dto.productId,
                quantity: dto.quantity,
                extras: dto.extraIds && dto.extraIds.length > 0
                    ? {
                        create: dto.extraIds.map((eId) => ({ extraId: eId })),
                    }
                    : undefined,
            },
        });
        return this.getCart(customerId);
    }
    async removeItem(customerId, cartItemId) {
        const cart = await this.prisma.cart.findUnique({ where: { customerId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const item = await this.prisma.cartItem.findFirst({
            where: { id: cartItemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.prisma.cartItem.delete({ where: { id: cartItemId } });
        return this.getCart(customerId);
    }
    async updateQuantity(customerId, cartItemId, quantity) {
        const cart = await this.prisma.cart.findUnique({ where: { customerId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const item = await this.prisma.cartItem.findFirst({
            where: { id: cartItemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
        return this.getCart(customerId);
    }
    async clearCart(customerId) {
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
    async applyCoupon(customerId, code) {
        const cart = await this.prisma.cart.findUnique({ where: { customerId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const coupon = await this.prisma.coupon.findUnique({ where: { code } });
        if (!coupon ||
            !coupon.isActive ||
            (coupon.validTo && coupon.validTo < new Date()) ||
            (coupon.validFrom && coupon.validFrom > new Date())) {
            throw new common_1.BadRequestException('Invalid or expired coupon');
        }
        await this.prisma.cart.update({
            where: { id: cart.id },
            data: { couponId: coupon.id },
        });
        return this.getCart(customerId);
    }
    async removeCoupon(customerId) {
        const cart = await this.prisma.cart.findUnique({ where: { customerId } });
        if (cart) {
            await this.prisma.cart.update({
                where: { id: cart.id },
                data: { couponId: null },
            });
        }
        return this.getCart(customerId);
    }
    calculateTotals(cart) {
        let subtotal = 0;
        const processedItems = cart.items.map((item) => {
            const pPrice = Number(item.product.discountPrice || item.product.basePrice);
            const extrasPrice = item.extras.reduce((sum, e) => sum + Number(e.extra.price), 0);
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
        const loyaltyDiscount = 0;
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
            }
            else if (cart.coupon.couponType === 'FIXED_AMOUNT') {
                couponDiscount = Number(cart.coupon.fixedDiscount);
            }
            discount += couponDiscount;
        }
        const deliveryFees = 0;
        let grandTotal = subtotal - discount + deliveryFees;
        if (grandTotal < 0)
            grandTotal = 0;
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
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map