"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrderNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderNotificationService = void 0;
const common_1 = require("@nestjs/common");
let OrderNotificationService = OrderNotificationService_1 = class OrderNotificationService {
    logger = new common_1.Logger(OrderNotificationService_1.name);
    async notifyNewOrder(orderId, orderCode) {
        this.logger.log(`[NOTIFICATION] New Order Placed: ${orderCode} (ID: ${orderId})`);
        return Promise.resolve();
    }
    async notifyStatusChange(orderId, orderCode, newStatus) {
        this.logger.log(`[NOTIFICATION] Order ${orderCode} status changed to ${newStatus}`);
        return Promise.resolve();
    }
    async notifyOrderCancelled(orderId, orderCode) {
        this.logger.log(`[NOTIFICATION] Order ${orderCode} was cancelled`);
        return Promise.resolve();
    }
};
exports.OrderNotificationService = OrderNotificationService;
exports.OrderNotificationService = OrderNotificationService = OrderNotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], OrderNotificationService);
//# sourceMappingURL=order-notification.service.js.map