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
exports.CustomerCartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("../services/cart.service");
const cart_dto_1 = require("../dto/cart.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let CustomerCartController = class CustomerCartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(user) {
        return this.cartService.getCart(user.id);
    }
    addItem(user, dto) {
        return this.cartService.addItem(user.id, dto);
    }
    updateQuantity(user, itemId, dto) {
        return this.cartService.updateQuantity(user.id, itemId, dto.quantity);
    }
    removeItem(user, itemId) {
        return this.cartService.removeItem(user.id, itemId);
    }
    clearCart(user) {
        return this.cartService.clearCart(user.id);
    }
    applyCoupon(user, dto) {
        return this.cartService.applyCoupon(user.id, dto.code);
    }
    removeCoupon(user) {
        return this.cartService.removeCoupon(user.id);
    }
};
exports.CustomerCartController = CustomerCartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current cart' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to cart' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.AddCartItemDto]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)('items/:itemId/quantity'),
    (0, swagger_1.ApiOperation)({ summary: 'Update item quantity' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, cart_dto_1.UpdateCartItemQuantityDto]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "updateQuantity", null);
__decorate([
    (0, common_1.Delete)('items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from cart' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Clear cart' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Post)('coupon'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply coupon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_dto_1.ApplyCouponDto]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "applyCoupon", null);
__decorate([
    (0, common_1.Delete)('coupon'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove coupon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerCartController.prototype, "removeCoupon", null);
exports.CustomerCartController = CustomerCartController = __decorate([
    (0, swagger_1.ApiTags)('Customer Cart'),
    (0, common_1.Controller)('customer/cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('CUSTOMER'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CustomerCartController);
//# sourceMappingURL=customer-cart.controller.js.map