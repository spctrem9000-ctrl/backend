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
exports.CustomerOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../services/order.service");
const checkout_service_1 = require("../services/checkout.service");
const checkout_dto_1 = require("../dto/checkout.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let CustomerOrderController = class CustomerOrderController {
    orderService;
    checkoutService;
    constructor(orderService, checkoutService) {
        this.orderService = orderService;
        this.checkoutService = checkoutService;
    }
    checkout(user, dto) {
        return this.checkoutService.checkout(user.id, dto);
    }
    getOrders(user) {
        return this.orderService.getCustomerOrders(user.id);
    }
    getOrderDetails(user, id) {
        return this.orderService.getCustomerOrderDetails(user.id, id);
    }
    cancelOrder(user, id) {
        return this.orderService.cancelOrderCustomer(user.id, id);
    }
};
exports.CustomerOrderController = CustomerOrderController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an order from cart' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, checkout_dto_1.CheckoutDto]),
    __metadata("design:returntype", void 0)
], CustomerOrderController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get order history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerOrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order details and tracking' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerOrderController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel order (only if Pending)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerOrderController.prototype, "cancelOrder", null);
exports.CustomerOrderController = CustomerOrderController = __decorate([
    (0, swagger_1.ApiTags)('Customer Orders & Checkout'),
    (0, common_1.Controller)('customer/orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CUSTOMER'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        checkout_service_1.CheckoutService])
], CustomerOrderController);
//# sourceMappingURL=customer-order.controller.js.map