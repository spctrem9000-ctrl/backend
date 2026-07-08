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
exports.ExtraService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let ExtraService = class ExtraService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createGroup(dto, adminId) {
        return this.prisma.extraGroup.create({
            data: {
                ...dto,
                createdBy: adminId,
            },
        });
    }
    async updateGroup(id, dto, _adminId) {
        const group = await this.prisma.extraGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('Extra Group not found');
        return this.prisma.extraGroup.update({
            where: { id },
            data: dto,
        });
    }
    async deleteGroup(id, _adminId) {
        const group = await this.prisma.extraGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('Extra Group not found');
        return this.prisma.extraGroup.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
    async getGroups(includeDeleted = false) {
        return this.prisma.extraGroup.findMany({
            where: includeDeleted ? undefined : { isDeleted: false },
            include: {
                extras: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } },
            },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async createExtra(groupId, dto, adminId) {
        const group = await this.prisma.extraGroup.findUnique({
            where: { id: groupId },
        });
        if (!group)
            throw new common_1.NotFoundException('Extra Group not found');
        return this.prisma.extra.create({
            data: {
                ...dto,
                extraGroupId: groupId,
                createdBy: adminId,
            },
        });
    }
    async updateExtra(id, dto, _adminId) {
        const extra = await this.prisma.extra.findUnique({ where: { id } });
        if (!extra)
            throw new common_1.NotFoundException('Extra not found');
        return this.prisma.extra.update({
            where: { id },
            data: dto,
        });
    }
    async deleteExtra(id, _adminId) {
        const extra = await this.prisma.extra.findUnique({ where: { id } });
        if (!extra)
            throw new common_1.NotFoundException('Extra not found');
        return this.prisma.extra.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
    async linkGroupToProduct(productId, groupId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const group = await this.prisma.extraGroup.findUnique({
            where: { id: groupId },
        });
        if (!group)
            throw new common_1.NotFoundException('Extra Group not found');
        return this.prisma.productExtraGroup.upsert({
            where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
            update: {},
            create: { productId, extraGroupId: groupId },
        });
    }
    async unlinkGroupFromProduct(productId, groupId) {
        return this.prisma.productExtraGroup
            .delete({
            where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
        })
            .catch(() => null);
    }
};
exports.ExtraService = ExtraService;
exports.ExtraService = ExtraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExtraService);
//# sourceMappingURL=extra.service.js.map