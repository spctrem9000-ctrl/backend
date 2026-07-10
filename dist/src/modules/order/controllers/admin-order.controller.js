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
exports.AdminOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../services/order.service");
const order_filter_dto_1 = require("../dto/order-filter.dto");
const order_status_dto_1 = require("../dto/order-status.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let AdminOrderController = class AdminOrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrders(filters) {
        return this.orderService.getOrders(filters);
    }
    getOrderDetails(id) {
        return this.orderService.getAdminOrderDetails(id);
    }
    changeStatus(id, dto, user) {
        return this.orderService.changeOrderStatus(id, dto.status, user.id);
    }
};
exports.AdminOrderController = AdminOrderController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and filter orders' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_filter_dto_1.OrderFilterDto]),
    __metadata("design:returntype", void 0)
], AdminOrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get full order details, history, and activity log',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminOrderController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Change order status' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, order_status_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], AdminOrderController.prototype, "changeStatus", null);
exports.AdminOrderController = AdminOrderController = __decorate([
    (0, swagger_1.ApiTags)('Admin Orders'),
    (0, common_1.Controller)('admin/orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], AdminOrderController);
//# sourceMappingURL=admin-order.controller.js.map