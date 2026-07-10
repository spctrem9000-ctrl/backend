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
exports.HomeBuilderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let HomeBuilderService = class HomeBuilderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAdminLayout() {
        return this.prisma.homeSection.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                customProducts: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        product: {
                            select: { id: true, nameEn: true, nameAr: true, mainImage: true },
                        },
                    },
                },
            },
        });
    }
    async getHomeLayout() {
        return this.prisma.homeSection.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
                customProducts: {
                    orderBy: { sortOrder: 'asc' },
                    include: { product: true },
                },
            },
        });
    }
    async createSection(data) {
        const count = await this.prisma.homeSection.count();
        const { productIds, ...rest } = data;
        return this.prisma.homeSection.create({
            data: {
                ...rest,
                sortOrder: count,
                customProducts: productIds?.length
                    ? {
                        create: productIds.map((id, idx) => ({
                            productId: id,
                            sortOrder: idx,
                        })),
                    }
                    : undefined,
            },
        });
    }
    async updateSection(id, data) {
        const { productIds, ...rest } = data;
        if (productIds !== undefined) {
            await this.prisma.homeSectionProduct.deleteMany({
                where: { homeSectionId: id },
            });
        }
        return this.prisma.homeSection.update({
            where: { id },
            data: {
                ...rest,
                customProducts: productIds?.length
                    ? {
                        create: productIds.map((pid, idx) => ({
                            productId: pid,
                            sortOrder: idx,
                        })),
                    }
                    : undefined,
            },
        });
    }
    async deleteSection(id) {
        return this.prisma.homeSection.delete({ where: { id } });
    }
    async reorderSections(orderedIds) {
        const updates = orderedIds.map((id, index) => this.prisma.homeSection.update({
            where: { id },
            data: { sortOrder: index },
        }));
        return this.prisma.$transaction(updates);
    }
};
exports.HomeBuilderService = HomeBuilderService;
exports.HomeBuilderService = HomeBuilderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeBuilderService);
//# sourceMappingURL=home-builder.service.js.map