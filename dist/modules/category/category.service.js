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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("./category.repository");
const crypto_1 = require("crypto");
let CategoryService = class CategoryService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(dto, adminId) {
        await this.validateUniqueName(dto.nameAr, dto.nameEn);
        await this.handleDisplayOrderCollision(dto.displayOrder);
        const categoryCode = `CAT-${(0, crypto_1.randomBytes)(3).toString('hex').toUpperCase()}`;
        return this.categoryRepository.create({
            ...dto,
            categoryCode,
            createdBy: adminId,
        });
    }
    async update(id, dto, adminId) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        if (dto.nameAr || dto.nameEn) {
            await this.validateUniqueName(dto.nameAr || category.nameAr, dto.nameEn || category.nameEn, id);
        }
        if (dto.displayOrder && dto.displayOrder !== category.displayOrder) {
            await this.handleDisplayOrderCollision(dto.displayOrder);
        }
        return this.categoryRepository.update(id, {
            ...dto,
            updatedBy: adminId,
        });
    }
    async delete(id, adminId) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const count = category?._count?.products || 0;
        if (category && count > 0) {
            throw new common_1.BadRequestException('Cannot delete a category containing products');
        }
        return this.categoryRepository.update(id, {
            isDeleted: true,
            updatedBy: adminId,
        });
    }
    async restore(id, adminId) {
        const category = await this.categoryRepository.findById(id, true);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        if (!category.isDeleted)
            throw new common_1.BadRequestException('Category is not deleted');
        return this.categoryRepository.update(id, {
            isDeleted: false,
            updatedBy: adminId,
        });
    }
    async getDetails(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async searchCategories(query) {
        if (!query)
            return [];
        return this.categoryRepository.search(query);
    }
    async toggleActive(id, isActive, adminId) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return this.categoryRepository.update(id, { isActive, updatedBy: adminId });
    }
    async changeDisplayOrder(id, newOrder, adminId) {
        const category = await this.categoryRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        if (category.displayOrder === newOrder)
            return category;
        await this.handleDisplayOrderCollision(newOrder);
        return this.categoryRepository.update(id, {
            displayOrder: newOrder,
            updatedBy: adminId,
        });
    }
    async getActiveCategories() {
        return this.categoryRepository.findAllActive();
    }
    async getFeaturedCategories() {
        return this.categoryRepository.findAllFeatured();
    }
    async validateUniqueName(nameAr, nameEn, excludeId) {
        const existing = await this.categoryRepository.findByName(nameAr, nameEn);
        if (existing && existing.id !== excludeId) {
            throw new common_1.BadRequestException('Category name (Arabic or English) already exists');
        }
    }
    async handleDisplayOrderCollision(order) {
        const existing = await this.categoryRepository.findByDisplayOrder(order);
        if (existing) {
            await this.categoryRepository.shiftDisplayOrders(order);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map