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
exports.BannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let BannerService = class BannerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapBanner(banner) {
        const { targetId, ...rest } = banner;
        return {
            ...rest,
            targetUrl: targetId,
        };
    }
    async getAdminBanners() {
        const banners = await this.prisma.banner.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        return banners.map((b) => this.mapBanner(b));
    }
    async getActiveBanners() {
        const now = new Date();
        const banners = await this.prisma.banner.findMany({
            where: {
                isActive: true,
                OR: [
                    { startDate: null, endDate: null },
                    { startDate: { lte: now }, endDate: { gte: now } },
                ],
            },
            orderBy: { sortOrder: 'asc' },
        });
        return banners.map((b) => this.mapBanner(b));
    }
    async createBanner(data) {
        const count = await this.prisma.banner.count();
        if (data.targetUrl !== undefined) {
            data.targetId = data.targetUrl;
            delete data.targetUrl;
        }
        const banner = await this.prisma.banner.create({
            data: {
                ...data,
                sortOrder: count,
            },
        });
        return this.mapBanner(banner);
    }
    async updateBanner(id, data) {
        if (data.targetUrl !== undefined) {
            data.targetId = data.targetUrl;
            delete data.targetUrl;
        }
        const banner = await this.prisma.banner.update({
            where: { id },
            data,
        });
        return this.mapBanner(banner);
    }
    async deleteBanner(id) {
        const banner = await this.prisma.banner.delete({
            where: { id },
        });
        return this.mapBanner(banner);
    }
    async reorderBanners(orderedIds) {
        const updates = orderedIds.map((id, index) => this.prisma.banner.update({
            where: { id },
            data: { sortOrder: index },
        }));
        return this.prisma.$transaction(updates);
    }
};
exports.BannerService = BannerService;
exports.BannerService = BannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BannerService);
//# sourceMappingURL=banner.service.js.map