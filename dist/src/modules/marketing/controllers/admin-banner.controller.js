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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBannerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const banner_service_1 = require("../services/banner.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let AdminBannerController = class AdminBannerController {
    bannerService;
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    getBanners() {
        return this.bannerService.getAdminBanners();
    }
    createBanner(data) {
        return this.bannerService.createBanner(data);
    }
    reorderBanners(body) {
        return this.bannerService.reorderBanners(body.orderedIds);
    }
    updateBanner(id, data) {
        return this.bannerService.updateBanner(id, data);
    }
    deleteBanner(id) {
        return this.bannerService.deleteBanner(id);
    }
};
exports.AdminBannerController = AdminBannerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all banners' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminBannerController.prototype, "getBanners", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create banner' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminBannerController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Put)('reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder banners' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminBannerController.prototype, "reorderBanners", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update banner' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminBannerController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete banner' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminBannerController.prototype, "deleteBanner", null);
exports.AdminBannerController = AdminBannerController = __decorate([
    (0, swagger_1.ApiTags)('Admin Banners'),
    (0, common_1.Controller)('admin/banners'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], AdminBannerController);
//# sourceMappingURL=admin-banner.controller.js.map