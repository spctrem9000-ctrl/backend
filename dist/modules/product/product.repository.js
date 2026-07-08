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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductRepository = class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.product.create({
            data,
            include: { images: true, insight: true },
        });
    }
    async findById(id, includeDeleted = false) {
        return this.prisma.product.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: {
                category: true,
                images: { orderBy: { sortOrder: 'asc' } },
                insight: true,
                priceHistory: { orderBy: { createdAt: 'desc' }, take: 5 },
            },
        });
    }
    async findByCode(productCode) {
        return this.prisma.product.findFirst({
            where: { productCode, isDeleted: false },
        });
    }
    async update(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
            include: { images: true, insight: true },
        });
    }
    async findAll(filters, isAdmin = false) {
        const where = {
            isDeleted: false,
        };
        if (!isAdmin) {
            where.isAvailable = true;
        }
        if (filters.search) {
            where.OR = [
                { nameAr: { contains: filters.search, mode: 'insensitive' } },
                { nameEn: { contains: filters.search, mode: 'insensitive' } },
                { descriptionAr: { contains: filters.search, mode: 'insensitive' } },
                { descriptionEn: { contains: filters.search, mode: 'insensitive' } },
                { productCode: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.categoryId)
            where.categoryId = filters.categoryId;
        if (filters.isAvailable !== undefined)
            where.isAvailable = filters.isAvailable;
        if (filters.isBestSeller !== undefined)
            where.isBestSeller = filters.isBestSeller;
        if (filters.isOffer !== undefined)
            where.isOffer = filters.isOffer;
        if (filters.isNew !== undefined)
            where.isNew = filters.isNew;
        if (filters.isFeatured !== undefined)
            where.isFeatured = filters.isFeatured;
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.basePrice = {};
            if (filters.minPrice !== undefined)
                where.basePrice.gte = filters.minPrice;
            if (filters.maxPrice !== undefined)
                where.basePrice.lte = filters.maxPrice;
        }
        let orderBy = { sortOrder: 'asc' };
        switch (filters.sortBy) {
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'oldest':
                orderBy = { createdAt: 'asc' };
                break;
            case 'price_asc':
                orderBy = { basePrice: 'asc' };
                break;
            case 'price_desc':
                orderBy = { basePrice: 'desc' };
                break;
            case 'alphabetical':
                orderBy = { nameEn: 'asc' };
                break;
            case 'manual':
                orderBy = { sortOrder: 'asc' };
                break;
        }
        return this.prisma.product.findMany({
            where,
            orderBy,
            include: {
                category: { select: { id: true, nameAr: true, nameEn: true } },
                images: { orderBy: { sortOrder: 'asc' } },
                insight: true,
            },
        });
    }
    async logActivity(productId, action, adminId, details) {
        return this.prisma.productActivityLog.create({
            data: {
                productId,
                action,
                adminId,
                details: details ? details : client_1.Prisma.JsonNull,
            },
        });
    }
    async recordPriceChange(productId, oldPrice, newPrice, adminId, reason) {
        return this.prisma.productPriceHistory.create({
            data: {
                productId,
                oldPrice,
                newPrice,
                changedBy: adminId,
                reason,
            },
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map