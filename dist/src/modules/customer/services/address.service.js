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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let AddressService = class AddressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(customerId, dto) {
        if (dto.isDefault) {
            await this.clearDefault(customerId);
        }
        return this.prisma.address.create({
            data: { ...dto, customerId },
        });
    }
    async findAll(customerId) {
        return this.prisma.address.findMany({
            where: { customerId, isDeleted: false },
            orderBy: { isDefault: 'desc' },
        });
    }
    async update(id, customerId, dto) {
        const address = await this.prisma.address.findFirst({
            where: { id, customerId, isDeleted: false },
        });
        if (!address)
            throw new common_1.NotFoundException('Address not found');
        if (dto.isDefault) {
            await this.clearDefault(customerId);
        }
        return this.prisma.address.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, customerId) {
        const address = await this.prisma.address.findFirst({
            where: { id, customerId, isDeleted: false },
        });
        if (!address)
            throw new common_1.NotFoundException('Address not found');
        return this.prisma.address.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
    async setDefault(id, customerId) {
        const address = await this.prisma.address.findFirst({
            where: { id, customerId, isDeleted: false },
        });
        if (!address)
            throw new common_1.NotFoundException('Address not found');
        await this.clearDefault(customerId);
        return this.prisma.address.update({
            where: { id },
            data: { isDefault: true },
        });
    }
    async clearDefault(customerId) {
        await this.prisma.address.updateMany({
            where: { customerId, isDefault: true, isDeleted: false },
            data: { isDefault: false },
        });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.service.js.map