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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const order_notification_service_1 = require("./order-notification.service");
const client_1 = require("@prisma/client");
let OrderService = class OrderService {
    prisma;
    notificationService;
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getCustomerOrders(customerId) {
        return this.prisma.order.findMany({
            where: { customerId, isDeleted: false },
            orderBy: { createdAt: 'desc' },
            include: { items: { include: { product: true } } },
        });
    }
    async getCustomerOrderDetails(customerId, orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, customerId, isDeleted: false },
            include: {
                items: {
                    include: { product: true, extras: { include: { extra: true } } },
                },
                address: true,
                statusHistory: { orderBy: { changedAt: 'desc' } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async cancelOrderCustomer(customerId, orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, customerId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status !== client_1.OrderStatus.PENDING &&
            order.status !== client_1.OrderStatus.CONFIRMED) {
            throw new common_1.BadRequestException('Order cannot be cancelled at this stage');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: client_1.OrderStatus.CANCELLED,
                statusHistory: {
                    create: {
                        oldStatus: order.status,
                        newStatus: client_1.OrderStatus.CANCELLED,
                        changedBy: customer.guid,
                    },
                },
                activityLogs: {
                    create: { action: client_1.OrderAction.CANCEL, customerId: customer.guid },
                },
            },
        });
        await this.notificationService.notifyOrderCancelled(updated.id, updated.orderCode);
        return updated;
    }
    async getOrders(filters) {
        const where = { isDeleted: false };
        if (filters.status)
            where.status = filters.status;
        if (filters.orderType)
            where.orderType = filters.orderType;
        if (filters.paymentMethod)
            where.paymentMethod = filters.paymentMethod;
        if (filters.query) {
            where.OR = [
                { orderCode: { contains: filters.query, mode: 'insensitive' } },
                {
                    customer: { name: { contains: filters.query, mode: 'insensitive' } },
                },
                { customer: { phone: { contains: filters.query } } },
            ];
        }
        return this.prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: { select: { name: true, phone: true } },
                address: true,
            },
        });
    }
    async getAdminOrderDetails(orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, isDeleted: false },
            include: {
                customer: true,
                items: {
                    include: { product: true, extras: { include: { extra: true } } },
                },
                address: true,
                statusHistory: { orderBy: { changedAt: 'desc' } },
                activityLogs: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async changeOrderStatus(orderId, newStatus, adminId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status === newStatus)
            return order;
        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: newStatus,
                statusHistory: {
                    create: { oldStatus: order.status, newStatus, changedBy: adminId },
                },
                activityLogs: {
                    create: {
                        action: client_1.OrderAction.STATUS_CHANGE,
                        adminId,
                        details: { old: order.status, new: newStatus },
                    },
                },
            },
        });
        await this.notificationService.notifyStatusChange(updated.id, updated.orderCode, newStatus);
        return updated;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        order_notification_service_1.OrderNotificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map