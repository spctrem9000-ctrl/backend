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
exports.AdminDashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let AdminDashboardService = class AdminDashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [todaysOrders, todaysRevenueResult, pendingOrders, latestOrders, topProducts,] = await Promise.all([
            this.prisma.order.count({
                where: { createdAt: { gte: today } },
            }),
            this.prisma.order.aggregate({
                where: { createdAt: { gte: today } },
                _sum: { grandTotal: true },
            }),
            this.prisma.order.count({
                where: { status: 'PENDING' },
            }),
            this.prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { customer: { select: { name: true } } },
            }),
            this.prisma.productInsight.findMany({
                take: 5,
                orderBy: { purchased: 'desc' },
                include: {
                    product: {
                        select: { nameEn: true, nameAr: true, mainImage: true, id: true },
                    },
                },
            }),
        ]);
        return {
            todaysOrders,
            todaysRevenue: todaysRevenueResult._sum.grandTotal || 0,
            pendingOrders,
            lowStock: 0,
            latestOrders: latestOrders.map((o) => ({
                id: o.id,
                orderCode: o.orderCode,
                customerName: o.customer.name,
                amount: Number(o.grandTotal),
                createdAt: o.createdAt,
            })),
            topProducts: topProducts.map((p) => ({
                id: p.product.id,
                name: p.product.nameEn || p.product.nameAr,
                image: p.product.mainImage,
                sales: p.purchased,
            })),
        };
    }
};
exports.AdminDashboardService = AdminDashboardService;
exports.AdminDashboardService = AdminDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminDashboardService);
//# sourceMappingURL=admin-dashboard.service.js.map