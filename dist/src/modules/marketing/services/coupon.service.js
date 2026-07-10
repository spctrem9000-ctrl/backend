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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let CouponService = class CouponService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAdminCoupons() {
        return this.prisma.coupon.findMany({
            include: {
                targetProducts: {
                    include: { product: { select: { id: true, nameEn: true } } },
                },
                targetCategories: {
                    include: { category: { select: { id: true, nameEn: true } } },
                },
                targetCustomers: {
                    include: {
                        customer: { select: { id: true, name: true, phone: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createCoupon(data) {
        const { productIds, categoryIds, customerIds, ...rest } = data;
        return this.prisma.coupon.create({
            data: {
                ...rest,
                targetProducts: productIds?.length
                    ? {
                        create: productIds.map((id) => ({ productId: id })),
                    }
                    : undefined,
                targetCategories: categoryIds?.length
                    ? {
                        create: categoryIds.map((id) => ({ categoryId: id })),
                    }
                    : undefined,
                targetCustomers: customerIds?.length
                    ? {
                        create: customerIds.map((id) => ({ customerId: id })),
                    }
                    : undefined,
            },
        });
    }
    async updateCoupon(id, data) {
        const { productIds, categoryIds, customerIds, ...rest } = data;
        if (productIds !== undefined)
            await this.prisma.couponProduct.deleteMany({ where: { couponId: id } });
        if (categoryIds !== undefined)
            await this.prisma.couponCategory.deleteMany({ where: { couponId: id } });
        if (customerIds !== undefined)
            await this.prisma.couponCustomer.deleteMany({ where: { couponId: id } });
        return this.prisma.coupon.update({
            where: { id },
            data: {
                ...rest,
                targetProducts: productIds?.length
                    ? {
                        create: productIds.map((pid) => ({ productId: pid })),
                    }
                    : undefined,
                targetCategories: categoryIds?.length
                    ? {
                        create: categoryIds.map((cid) => ({ categoryId: cid })),
                    }
                    : undefined,
                targetCustomers: customerIds?.length
                    ? {
                        create: customerIds.map((cid) => ({ customerId: cid })),
                    }
                    : undefined,
            },
        });
    }
    async deleteCoupon(id) {
        return this.prisma.coupon.delete({ where: { id } });
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponService);
//# sourceMappingURL=coupon.service.js.map