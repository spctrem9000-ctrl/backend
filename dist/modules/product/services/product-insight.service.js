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
var ProductInsightService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInsightService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let ProductInsightService = ProductInsightService_1 = class ProductInsightService {
    prisma;
    logger = new common_1.Logger(ProductInsightService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async incrementViews(productId) {
        try {
            await this.prisma.productInsight.upsert({
                where: { productId },
                create: { productId, views: 1 },
                update: { views: { increment: 1 } },
            });
        }
        catch (err) {
            const e = err;
            this.logger.error(`Failed to increment views for product ${productId}`, e.stack);
        }
    }
    async recordPurchase(productId, revenue) {
        try {
            const insight = await this.prisma.productInsight.upsert({
                where: { productId },
                create: { productId, purchased: 1, revenue },
                update: {
                    purchased: { increment: 1 },
                    revenue: { increment: revenue },
                },
            });
            const views = insight.views > 0 ? insight.views : 1;
            const conversionRate = (insight.purchased / views) * 100;
            await this.prisma.productInsight.update({
                where: { productId },
                data: { conversionRate },
            });
        }
        catch (err) {
            const e = err;
            this.logger.error(`Failed to record purchase for product ${productId}`, e.stack);
        }
    }
};
exports.ProductInsightService = ProductInsightService;
exports.ProductInsightService = ProductInsightService = ProductInsightService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductInsightService);
//# sourceMappingURL=product-insight.service.js.map