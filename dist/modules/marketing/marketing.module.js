"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingModule = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./services/coupon.service");
const banner_service_1 = require("./services/banner.service");
const admin_coupon_controller_1 = require("./controllers/admin-coupon.controller");
const admin_banner_controller_1 = require("./controllers/admin-banner.controller");
const customer_banner_controller_1 = require("./controllers/customer-banner.controller");
let MarketingModule = class MarketingModule {
};
exports.MarketingModule = MarketingModule;
exports.MarketingModule = MarketingModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            admin_coupon_controller_1.AdminCouponController,
            admin_banner_controller_1.AdminBannerController,
            customer_banner_controller_1.CustomerBannerController,
        ],
        providers: [coupon_service_1.CouponService, banner_service_1.BannerService],
        exports: [coupon_service_1.CouponService],
    })
], MarketingModule);
//# sourceMappingURL=marketing.module.js.map