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
exports.AdminCouponController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const coupon_service_1 = require("../services/coupon.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let AdminCouponController = class AdminCouponController {
    couponService;
    constructor(couponService) {
        this.couponService = couponService;
    }
    getCoupons() {
        return this.couponService.getAdminCoupons();
    }
    createCoupon(data) {
        return this.couponService.createCoupon(data);
    }
    updateCoupon(id, data) {
        return this.couponService.updateCoupon(id, data);
    }
    deleteCoupon(id) {
        return this.couponService.deleteCoupon(id);
    }
};
exports.AdminCouponController = AdminCouponController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all coupons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCouponController.prototype, "getCoupons", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create coupon' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCouponController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update coupon' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminCouponController.prototype, "updateCoupon", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete coupon' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCouponController.prototype, "deleteCoupon", null);
exports.AdminCouponController = AdminCouponController = __decorate([
    (0, swagger_1.ApiTags)('Admin Coupons'),
    (0, common_1.Controller)('admin/coupons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], AdminCouponController);
//# sourceMappingURL=admin-coupon.controller.js.map