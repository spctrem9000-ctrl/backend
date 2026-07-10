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
exports.LoyaltyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let LoyaltyService = class LoyaltyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBalance(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return { points: customer.loyaltyPoints };
    }
    async getHistory(customerId) {
        return this.prisma.loyaltyTransaction.findMany({
            where: { customerId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async earnPoints(customerId, points, orderId) {
        await this.prisma.$transaction([
            this.prisma.loyaltyTransaction.create({
                data: { customerId, points, type: 'EARN', orderId },
            }),
            this.prisma.customer.update({
                where: { id: customerId },
                data: { loyaltyPoints: { increment: points } },
            }),
        ]);
    }
    async redeemPoints(customerId, points, orderId) {
        await this.prisma.$transaction([
            this.prisma.loyaltyTransaction.create({
                data: { customerId, points: -points, type: 'REDEEM', orderId },
            }),
            this.prisma.customer.update({
                where: { id: customerId },
                data: { loyaltyPoints: { decrement: points } },
            }),
        ]);
    }
    async getConfig() {
        const setting = await this.prisma.setting.findUnique({
            where: { key: 'LOYALTY_CONFIG' },
        });
        if (!setting) {
            return {
                enabled: false,
                pointsPerCurrency: 1,
                minRedeem: 100,
                maxRedeem: 1000,
                pointValue: 0.01,
            };
        }
        return setting.value;
    }
    async updateConfig(config) {
        return this.prisma.setting.upsert({
            where: { key: 'LOYALTY_CONFIG' },
            update: { value: config },
            create: { key: 'LOYALTY_CONFIG', value: config },
        });
    }
    async getAllTransactions() {
        return this.prisma.loyaltyTransaction.findMany({
            orderBy: { createdAt: 'desc' },
            include: { customer: { select: { name: true, phone: true } } },
        });
    }
    async manualAdjustment(data) {
        await this.prisma.$transaction([
            this.prisma.loyaltyTransaction.create({
                data: {
                    customerId: data.customerId,
                    points: data.points,
                    type: 'ADJUSTMENT',
                    reason: data.reason,
                    adminId: data.adminId,
                },
            }),
            this.prisma.customer.update({
                where: { id: data.customerId },
                data: { loyaltyPoints: { increment: data.points } },
            }),
        ]);
        return { success: true };
    }
};
exports.LoyaltyService = LoyaltyService;
exports.LoyaltyService = LoyaltyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoyaltyService);
//# sourceMappingURL=loyalty.service.js.map