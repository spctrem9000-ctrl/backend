"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngagementModule = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./services/notification.service");
const admin_notification_controller_1 = require("./controllers/admin-notification.controller");
const customer_notification_controller_1 = require("./controllers/customer-notification.controller");
let EngagementModule = class EngagementModule {
};
exports.EngagementModule = EngagementModule;
exports.EngagementModule = EngagementModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_notification_controller_1.AdminNotificationController, customer_notification_controller_1.CustomerNotificationController],
        providers: [notification_service_1.NotificationService],
        exports: [notification_service_1.NotificationService],
    })
], EngagementModule);
//# sourceMappingURL=engagement.module.js.map