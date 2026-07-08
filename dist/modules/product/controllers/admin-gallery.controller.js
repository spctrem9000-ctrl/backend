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
exports.AdminGalleryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const prisma_service_1 = require("../../../core/prisma/prisma.service");
const storage_service_1 = require("../../storage/services/storage.service");
const gallery_dto_1 = require("../dto/gallery.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let AdminGalleryController = class AdminGalleryController {
    prisma;
    storageService;
    constructor(prisma, storageService) {
        this.prisma = prisma;
        this.storageService = storageService;
    }
    async uploadImages(productId, files) {
        if (!files || files.length === 0)
            throw new common_1.BadRequestException('No files uploaded');
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.images.length + files.length > 5) {
            throw new common_1.BadRequestException('A product can have a maximum of 5 gallery images');
        }
        const uploadedImages = [];
        let currentMaxSort = product.images.length > 0
            ? Math.max(...product.images.map((img) => img.sortOrder))
            : 0;
        for (const file of files) {
            const url = await this.storageService.uploadSingle(file, 'products');
            currentMaxSort += 1;
            const newImage = await this.prisma.productImage.create({
                data: {
                    productId,
                    imageUrl: url.originalUrl,
                    sortOrder: currentMaxSort,
                },
            });
            uploadedImages.push(newImage);
        }
        return uploadedImages;
    }
    async deleteImage(productId, imageId) {
        const image = await this.prisma.productImage.findFirst({
            where: { id: imageId, productId },
        });
        if (!image)
            throw new common_1.NotFoundException('Image not found in this product gallery');
        await this.prisma.productImage.delete({ where: { id: imageId } });
        await this.storageService.delete(image.imageUrl).catch(() => null);
        return { message: 'Image deleted' };
    }
    async reorderGallery(productId, dto) {
        const updates = dto.items.map((item) => this.prisma.productImage.updateMany({
            where: { id: item.imageId, productId },
            data: { sortOrder: item.sortOrder },
        }));
        await this.prisma.$transaction(updates);
        return { message: 'Gallery reordered successfully' };
    }
};
exports.AdminGalleryController = AdminGalleryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload images to Product Gallery (Max 5 total)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5)),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], AdminGalleryController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Delete)(':imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an image from Product Gallery' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('imageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminGalleryController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Put)('reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder Product Gallery images' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, gallery_dto_1.ReorderGalleryDto]),
    __metadata("design:returntype", Promise)
], AdminGalleryController.prototype, "reorderGallery", null);
exports.AdminGalleryController = AdminGalleryController = __decorate([
    (0, swagger_1.ApiTags)('Admin Product Gallery'),
    (0, common_1.Controller)('admin/products/:productId/gallery'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService])
], AdminGalleryController);
//# sourceMappingURL=admin-gallery.controller.js.map