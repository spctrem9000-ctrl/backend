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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
let TagService = class TagService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTag(dto) {
        return this.prisma.customerTag.create({ data: dto });
    }
    async getAllTags() {
        return this.prisma.customerTag.findMany({ where: { isDeleted: false } });
    }
    async assignTagToCustomer(customerId, tagId) {
        const tag = await this.prisma.customerTag.findUnique({
            where: { id: tagId, isDeleted: false },
        });
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        const mapping = await this.prisma.customerTagMapping.findUnique({
            where: { customerId_tagId: { customerId, tagId } },
        });
        if (!mapping) {
            await this.prisma.customerTagMapping.create({
                data: { customerId, tagId },
            });
        }
        return { message: 'Tag assigned' };
    }
    async removeTagFromCustomer(customerId, tagId) {
        await this.prisma.customerTagMapping.delete({
            where: { customerId_tagId: { customerId, tagId } },
        });
        return { message: 'Tag removed' };
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagService);
//# sourceMappingURL=tag.service.js.map