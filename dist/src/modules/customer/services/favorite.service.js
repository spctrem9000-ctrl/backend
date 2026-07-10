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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let FavoriteService = class FavoriteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async toggleFavorite(customerId, productId) {
        const existing = await this.prisma.favoriteProduct.findUnique({
            where: { customerId_productId: { customerId, productId } },
        });
        if (existing) {
            await this.prisma.favoriteProduct.delete({
                where: { customerId_productId: { customerId, productId } },
            });
            return { message: 'Removed from favorites', isFavorite: false };
        }
        const product = await this.prisma.product.findUnique({
            where: { id: productId, isDeleted: false },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.prisma.favoriteProduct.create({
            data: { customerId, productId },
        });
        return { message: 'Added to favorites', isFavorite: true };
    }
    async getFavorites(customerId) {
        const favorites = await this.prisma.favoriteProduct.findMany({
            where: { customerId },
            include: {
                product: true,
            },
        });
        return favorites.map((f) => f.product);
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map