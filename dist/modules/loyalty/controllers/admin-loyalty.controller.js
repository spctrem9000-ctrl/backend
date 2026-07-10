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
exports.AdminLoyaltyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const loyalty_service_1 = require("../services/loyalty.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let AdminLoyaltyController = class AdminLoyaltyController {
    loyaltyService;
    constructor(loyaltyService) {
        this.loyaltyService = loyaltyService;
    }
    getConfig() {
        return this.loyaltyService.getConfig();
    }
    updateConfig(data) {
        return this.loyaltyService.updateConfig(data);
    }
    getAllTransactions() {
        return this.loyaltyService.getAllTransactions();
    }
    manualAdjustment(data) {
        return this.loyaltyService.manualAdjustment(data);
    }
    getHistory(id) {
        return this.loyaltyService.getHistory(id);
    }
};
exports.AdminLoyaltyController = AdminLoyaltyController;
__decorate([
    (0, common_1.Get)('config'),
    (0, swagger_1.ApiOperation)({ summary: 'Get loyalty config' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminLoyaltyController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Put)('config'),
    (0, swagger_1.ApiOperation)({ summary: 'Update loyalty config' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminLoyaltyController.prototype, "updateConfig", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transactions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminLoyaltyController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Post)('adjustment'),
    (0, swagger_1.ApiOperation)({ summary: 'Manual point adjustment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminLoyaltyController.prototype, "manualAdjustment", null);
__decorate([
    (0, common_1.Get)(':customerId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer transaction history' }),
    __param(0, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminLoyaltyController.prototype, "getHistory", null);
exports.AdminLoyaltyController = AdminLoyaltyController = __decorate([
    (0, swagger_1.ApiTags)('Admin Loyalty'),
    (0, common_1.Controller)('admin/loyalty'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [loyalty_service_1.LoyaltyService])
], AdminLoyaltyController);
//# sourceMappingURL=admin-loyalty.controller.js.map