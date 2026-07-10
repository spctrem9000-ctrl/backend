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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let CategoryRepository = class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.category.create({ data });
    }
    async findById(id, includeDeleted = false) {
        return this.prisma.category.findFirst({
            where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
            include: { _count: { select: { products: true } } },
        });
    }
    async findByName(nameAr, nameEn) {
        return this.prisma.category.findFirst({
            where: {
                OR: [{ nameAr }, { nameEn }],
                isDeleted: false,
            },
        });
    }
    async findByDisplayOrder(displayOrder) {
        return this.prisma.category.findFirst({
            where: { displayOrder, isDeleted: false },
        });
    }
    async findAllActive() {
        return this.prisma.category.findMany({
            where: { isActive: true, isDeleted: false },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async findAllFeatured() {
        return this.prisma.category.findMany({
            where: { isFeatured: true, isActive: true, isDeleted: false },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async search(query) {
        return this.prisma.category.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { nameAr: { contains: query, mode: 'insensitive' } },
                    { nameEn: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async update(id, data) {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }
    async shiftDisplayOrders(startOrder) {
        await this.prisma.$executeRaw `
      UPDATE "Category" 
      SET "displayOrder" = "displayOrder" + 1 
      WHERE "displayOrder" >= ${startOrder} AND "isDeleted" = false
    `;
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map