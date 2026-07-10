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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_1 = require("./customer.repository");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const client_1 = require("@prisma/client");
let CustomerService = class CustomerService {
    customerRepository;
    prisma;
    constructor(customerRepository, prisma) {
        this.customerRepository = customerRepository;
        this.prisma = prisma;
    }
    async getProfile(customerId) {
        const customer = await this.customerRepository.findById(customerId);
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const { passwordHash: _ph, hashedRefreshToken: _hrt, isDeleted: _id, ...safeCustomer } = customer;
        return safeCustomer;
    }
    async getAllCustomers() {
        const customers = await this.prisma.customer.findMany({
            where: { isDeleted: false },
            include: {
                tags: { include: { tag: true } },
                notes: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return customers.map((c) => {
            const { passwordHash: _ph, hashedRefreshToken: _hrt, isDeleted: _id, ...safeCustomer } = c;
            return safeCustomer;
        });
    }
    async updateProfile(customerId, updateDto) {
        const updated = await this.customerRepository.update(customerId, updateDto);
        const { passwordHash: _ph, hashedRefreshToken: _hrt, isDeleted: _id, ...safeCustomer } = updated;
        return safeCustomer;
    }
    async softDeleteAccount(customerId) {
        await this.customerRepository.update(customerId, { isDeleted: true });
        return { message: 'Account deleted successfully' };
    }
    async getAdminCustomerDetails(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId, isDeleted: false },
            include: {
                addresses: { where: { isDeleted: false } },
                favorites: { include: { product: true } },
                tags: { include: { tag: true } },
                notes: { orderBy: { createdAt: 'desc' } },
                orders: { orderBy: { createdAt: 'desc' } },
                loyaltyHistory: { orderBy: { createdAt: 'desc' } },
                couponUsages: {
                    include: { coupon: true },
                    orderBy: { usedAt: 'desc' },
                },
            },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const { passwordHash: _ph, hashedRefreshToken: _hrt, isDeleted: _id, ...safeCustomer } = customer;
        let riskScore = 'Low Risk';
        if (safeCustomer.status === client_1.CustomerStatus.BLOCKED ||
            safeCustomer.cancelledOrders >= 5) {
            riskScore = 'High Risk';
        }
        else if (safeCustomer.cancelledOrders >= 2) {
            riskScore = 'Medium Risk';
        }
        const segments = [];
        const daysSinceRegistration = (new Date().getTime() - safeCustomer.createdAt.getTime()) /
            (1000 * 3600 * 24);
        if (daysSinceRegistration < 7)
            segments.push('New Customer');
        if (safeCustomer.status === client_1.CustomerStatus.VIP)
            segments.push('VIP Customer');
        if (safeCustomer.lastOrderDate) {
            const daysSinceLastOrder = (new Date().getTime() - safeCustomer.lastOrderDate.getTime()) /
                (1000 * 3600 * 24);
            if (daysSinceLastOrder > 30)
                segments.push('Inactive Customer');
        }
        if (Number(safeCustomer.totalSpent) > 500)
            segments.push('High Spending');
        if (safeCustomer.completedOrders > 5)
            segments.push('Frequent Customer');
        if (safeCustomer.cancelledOrders >= 2)
            segments.push('Many Cancellations');
        if (safeCustomer.status === client_1.CustomerStatus.BLOCKED)
            segments.push('Blocked Customer');
        const totalLoyaltyEarned = safeCustomer.loyaltyHistory
            .filter((l) => l.type === 'EARN')
            .reduce((sum, l) => sum + l.points, 0);
        const averageOrderValue = safeCustomer.completedOrders > 0
            ? Number(safeCustomer.totalSpent) / safeCustomer.completedOrders
            : 0;
        return {
            ...safeCustomer,
            riskScore,
            segments,
            statistics: {
                totalLoyaltyEarned,
                totalCouponsUsed: safeCustomer.couponUsages.length,
                averageOrderValue,
            },
        };
    }
    async getCustomerTimeline(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
            include: {
                orders: true,
                loyaltyHistory: true,
                couponUsages: { include: { coupon: true } },
                notes: true,
            },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const timeline = [];
        timeline.push({
            type: 'REGISTRATION',
            date: customer.createdAt,
            description: 'Customer registered account',
            action: 'Registration',
        });
        customer.orders.forEach((o) => {
            timeline.push({
                type: 'ORDER',
                date: o.createdAt,
                description: `Placed order ${o.orderCode} for $${o.grandTotal.toString()}`,
                action: 'Placed Order',
            });
        });
        customer.loyaltyHistory.forEach((l) => {
            timeline.push({
                type: 'LOYALTY',
                date: l.createdAt,
                description: `${l.type === 'EARN' ? 'Earned' : 'Redeemed'} ${l.points} points`,
                action: `Loyalty ${l.type}`,
            });
        });
        customer.couponUsages.forEach((c) => {
            timeline.push({
                type: 'COUPON',
                date: c.usedAt,
                description: `Used coupon ${c.coupon.code}`,
                action: 'Coupon Usage',
            });
        });
        customer.notes.forEach((n) => {
            timeline.push({
                type: 'NOTE',
                date: n.createdAt,
                description: `Added note: ${n.note}`,
                action: 'Note Added',
                user: n.createdBy,
            });
        });
        timeline.sort((a, b) => b.date.getTime() - a.date.getTime());
        return timeline;
    }
    async updateCustomerStatus(customerId, status) {
        return this.prisma.customer.update({
            where: { id: customerId },
            data: { status },
            select: { id: true, status: true },
        });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map