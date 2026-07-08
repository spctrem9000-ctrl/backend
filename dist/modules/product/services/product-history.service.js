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
var ProductHistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductHistoryService = ProductHistoryService_1 = class ProductHistoryService {
    prisma;
    logger = new common_1.Logger(ProductHistoryService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logAction(productId, action, adminId, details) {
        try {
            await this.prisma.productActivityLog.create({
                data: {
                    productId,
                    action,
                    adminId,
                    details: details ? JSON.parse(JSON.stringify(details)) : undefined,
                },
            });
        }
        catch (err) {
            const e = err;
            this.logger.error(`Failed to log activity ${action} for product ${productId}`, e.stack);
        }
    }
    async recordPriceChange(productId, oldPrice, newPrice, adminId, reason) {
        try {
            await this.prisma.productPriceHistory.create({
                data: {
                    productId,
                    oldPrice,
                    newPrice,
                    changedBy: adminId,
                    reason,
                },
            });
            await this.logAction(productId, client_1.ActivityAction.PRICE_CHANGE, adminId, {
                oldPrice,
                newPrice,
                reason,
            });
        }
        catch (err) {
            const e = err;
            this.logger.error(`Failed to record price change for product ${productId}`, e.stack);
        }
    }
};
exports.ProductHistoryService = ProductHistoryService;
exports.ProductHistoryService = ProductHistoryService = ProductHistoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductHistoryService);
//# sourceMappingURL=product-history.service.js.map