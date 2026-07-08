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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../product.repository");
const product_history_service_1 = require("./product-history.service");
const product_insight_service_1 = require("./product-insight.service");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let ProductService = class ProductService {
    productRepository;
    historyService;
    insightService;
    constructor(productRepository, historyService, insightService) {
        this.productRepository = productRepository;
        this.historyService = historyService;
        this.insightService = insightService;
    }
    async create(dto, adminId) {
        if (dto.discountPrice !== undefined && dto.discountPrice >= dto.basePrice) {
            throw new common_1.BadRequestException('Discount price must be strictly less than the base price');
        }
        if (dto.galleryImages && dto.galleryImages.length > 5) {
            throw new common_1.BadRequestException('A product can have a maximum of 5 gallery images');
        }
        const productCode = `PRD-${(0, crypto_1.randomBytes)(4).toString('hex').toUpperCase()}`;
        const product = await this.productRepository.create({
            productCode,
            nameAr: dto.nameAr,
            nameEn: dto.nameEn,
            descriptionAr: dto.descriptionAr,
            descriptionEn: dto.descriptionEn,
            mainImage: dto.mainImage,
            basePrice: dto.basePrice,
            discountPrice: dto.discountPrice,
            preparationTime: dto.preparationTime,
            calories: dto.calories,
            sortOrder: dto.sortOrder,
            isAvailable: dto.isAvailable,
            isFeatured: dto.isFeatured,
            isBestSeller: dto.isBestSeller,
            isNew: dto.isNew,
            isOffer: dto.isOffer,
            category: { connect: { id: dto.categoryId } },
            images: dto.galleryImages
                ? {
                    create: dto.galleryImages.map((img) => ({
                        imageUrl: img.imageUrl,
                        sortOrder: img.sortOrder || 0,
                    })),
                }
                : undefined,
            insight: {
                create: { views: 0 },
            },
            createdBy: adminId,
        });
        await this.historyService.logAction(product.id, client_1.ActivityAction.CREATE, adminId);
        return product;
    }
    async update(id, dto, adminId) {
        const product = await this.productRepository.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const newBase = dto.basePrice !== undefined ? dto.basePrice : Number(product.basePrice);
        const newDiscount = dto.discountPrice !== undefined
            ? dto.discountPrice
            : product.discountPrice
                ? Number(product.discountPrice)
                : undefined;
        if (newDiscount !== undefined && newDiscount >= newBase) {
            throw new common_1.BadRequestException('Discount price must be less than base price');
        }
        let imagesUpdate;
        if (dto.galleryImages) {
            if (dto.galleryImages.length > 5)
                throw new common_1.BadRequestException('Max 5 gallery images');
            imagesUpdate = {
                deleteMany: {},
                create: dto.galleryImages.map((img) => ({
                    imageUrl: img.imageUrl,
                    sortOrder: img.sortOrder || 0,
                })),
            };
        }
        const updated = await this.productRepository.update(id, {
            nameAr: dto.nameAr,
            nameEn: dto.nameEn,
            descriptionAr: dto.descriptionAr,
            descriptionEn: dto.descriptionEn,
            mainImage: dto.mainImage,
            basePrice: dto.basePrice,
            discountPrice: dto.discountPrice,
            preparationTime: dto.preparationTime,
            calories: dto.calories,
            sortOrder: dto.sortOrder,
            isAvailable: dto.isAvailable,
            isFeatured: dto.isFeatured,
            isBestSeller: dto.isBestSeller,
            isNew: dto.isNew,
            isOffer: dto.isOffer,
            category: dto.categoryId
                ? { connect: { id: dto.categoryId } }
                : undefined,
            images: imagesUpdate,
            updatedBy: adminId,
        });
        if (dto.basePrice !== undefined &&
            Number(dto.basePrice) !== Number(product.basePrice)) {
            await this.historyService.recordPriceChange(id, Number(product.basePrice), Number(dto.basePrice), adminId, 'Base price updated');
        }
        if (dto.mainImage !== undefined && dto.mainImage !== product.mainImage) {
            await this.historyService.logAction(id, client_1.ActivityAction.IMAGE_CHANGE, adminId, {
                type: 'mainImage',
                old: product.mainImage,
                new: dto.mainImage,
            });
        }
        if (dto.isAvailable !== undefined &&
            dto.isAvailable !== product.isAvailable) {
            await this.historyService.logAction(id, client_1.ActivityAction.STATUS_CHANGE, adminId, { field: 'isAvailable', val: dto.isAvailable });
        }
        await this.historyService.logAction(id, client_1.ActivityAction.UPDATE, adminId);
        return updated;
    }
    async delete(id, adminId) {
        const product = await this.productRepository.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const deleted = await this.productRepository.update(id, {
            isDeleted: true,
            updatedBy: adminId,
        });
        await this.historyService.logAction(id, client_1.ActivityAction.DELETE, adminId);
        return deleted;
    }
    async restore(id, adminId) {
        const product = await this.productRepository.findById(id, true);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (!product.isDeleted)
            throw new common_1.BadRequestException('Product is not deleted');
        const restored = await this.productRepository.update(id, {
            isDeleted: false,
            updatedBy: adminId,
        });
        await this.historyService.logAction(id, client_1.ActivityAction.RESTORE, adminId);
        return restored;
    }
    async duplicateProduct(id, adminId) {
        const original = (await this.productRepository.findById(id, true));
        if (!original)
            throw new common_1.NotFoundException('Product not found');
        const newCode = `PRD-${(0, crypto_1.randomBytes)(4).toString('hex').toUpperCase()}`;
        const duplicatedNameAr = original.nameAr + ' - Copy';
        const duplicatedNameEn = original.nameEn + ' - Copy';
        const duplicated = await this.productRepository.create({
            productCode: newCode,
            nameAr: duplicatedNameAr,
            nameEn: duplicatedNameEn,
            descriptionAr: original.descriptionAr,
            descriptionEn: original.descriptionEn,
            mainImage: original.mainImage,
            basePrice: original.basePrice,
            discountPrice: original.discountPrice,
            preparationTime: original.preparationTime,
            calories: original.calories,
            sortOrder: original.sortOrder,
            isAvailable: false,
            isFeatured: false,
            isBestSeller: false,
            isNew: true,
            isOffer: original.isOffer,
            category: { connect: { id: original.categoryId } },
            insight: { create: { views: 0 } },
            images: original.images && original.images.length > 0
                ? {
                    create: original.images.map((img) => ({
                        imageUrl: img.imageUrl,
                        sortOrder: img.sortOrder,
                    })),
                }
                : undefined,
            createdBy: adminId,
        });
        await this.historyService.logAction(duplicated.id, client_1.ActivityAction.CREATE, adminId, { note: `Duplicated from PRD #${id}` });
        return duplicated;
    }
    async toggleStatus(id, isAvailable, adminId) {
        const product = await this.productRepository.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const updated = await this.productRepository.update(id, {
            isAvailable,
            updatedBy: adminId,
        });
        await this.historyService.logAction(id, client_1.ActivityAction.STATUS_CHANGE, adminId, { field: 'isAvailable', val: isAvailable });
        return updated;
    }
    async getAdminDetails(id) {
        const product = await this.productRepository.findById(id, true);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async getCustomerDetails(id) {
        const product = await this.productRepository.findById(id, false);
        if (!product || !product.isAvailable)
            throw new common_1.NotFoundException('Product not found');
        await this.insightService.incrementViews(id);
        return product;
    }
    async searchAdmin(filters) {
        return this.productRepository.findAll(filters, true);
    }
    async searchCustomer(filters) {
        return this.productRepository.findAll(filters, false);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        product_history_service_1.ProductHistoryService,
        product_insight_service_1.ProductInsightService])
], ProductService);
//# sourceMappingURL=product.service.js.map