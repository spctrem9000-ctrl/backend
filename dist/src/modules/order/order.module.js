"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./services/order.service");
const checkout_service_1 = require("./services/checkout.service");
const order_notification_service_1 = require("./services/order-notification.service");
const customer_order_controller_1 = require("./controllers/customer-order.controller");
const admin_order_controller_1 = require("./controllers/admin-order.controller");
const cart_module_1 = require("../cart/cart.module");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [cart_module_1.CartModule],
        controllers: [customer_order_controller_1.CustomerOrderController, admin_order_controller_1.AdminOrderController],
        providers: [order_service_1.OrderService, checkout_service_1.CheckoutService, order_notification_service_1.OrderNotificationService],
        exports: [order_service_1.OrderService, checkout_service_1.CheckoutService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map