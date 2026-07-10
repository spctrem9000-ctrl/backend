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
exports.CustomerLoyaltyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const loyalty_service_1 = require("../services/loyalty.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let CustomerLoyaltyController = class CustomerLoyaltyController {
    loyaltyService;
    constructor(loyaltyService) {
        this.loyaltyService = loyaltyService;
    }
    getBalance(user) {
        return this.loyaltyService.getBalance(user.id);
    }
    getHistory(user) {
        return this.loyaltyService.getHistory(user.id);
    }
};
exports.CustomerLoyaltyController = CustomerLoyaltyController;
__decorate([
    (0, common_1.Get)('balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current point balance' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerLoyaltyController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transaction history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerLoyaltyController.prototype, "getHistory", null);
exports.CustomerLoyaltyController = CustomerLoyaltyController = __decorate([
    (0, swagger_1.ApiTags)('Customer Loyalty'),
    (0, common_1.Controller)('customer/loyalty'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CUSTOMER'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [loyalty_service_1.LoyaltyService])
], CustomerLoyaltyController);
//# sourceMappingURL=customer-loyalty.controller.js.map