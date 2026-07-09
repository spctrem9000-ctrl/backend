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
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
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
        const customers = await this.customerRepository.findAll();
        return customers.map(c => {
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
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map