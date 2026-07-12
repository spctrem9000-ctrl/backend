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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const storage_factory_1 = require("../storage.factory");
const image_processor_service_1 = require("./image-processor.service");
let StorageService = StorageService_1 = class StorageService {
    storageProvider;
    imageProcessor;
    logger = new common_1.Logger(StorageService_1.name);
    constructor(storageProvider, imageProcessor) {
        this.storageProvider = storageProvider;
        this.imageProcessor = imageProcessor;
    }
    async uploadSingle(file, folder) {
        const isAudio = file.mimetype.startsWith('audio/');
        if (isAudio) {
            const ext = file.originalname.split('.').pop() || 'mp3';
            const { v4: uuidv4 } = await import('uuid');
            const filename = `${uuidv4()}.${ext}`;
            const url = await this.storageProvider.uploadFile(file.buffer, filename, folder, file.mimetype);
            this.logger.log(`Audio file uploaded to folder ${folder}: ${filename}`);
            return { originalUrl: url, mediumUrl: url, thumbnailUrl: url };
        }
        const { original, medium, thumbnail, filename } = await this.imageProcessor.processImage(file.buffer);
        const mimeType = 'image/webp';
        const [originalUrl, mediumUrl, thumbnailUrl] = await Promise.all([
            this.storageProvider.uploadFile(original, `original_${filename}`, folder, mimeType),
            this.storageProvider.uploadFile(medium, `medium_${filename}`, folder, mimeType),
            this.storageProvider.uploadFile(thumbnail, `thumb_${filename}`, folder, mimeType),
        ]);
        this.logger.log(`File uploaded successfully to folder ${folder}: ${filename}`);
        return { originalUrl, mediumUrl, thumbnailUrl };
    }
    async uploadMultiple(files, folder) {
        return Promise.all(files.map((file) => this.uploadSingle(file, folder)));
    }
    async delete(url) {
        await this.storageProvider.deleteFile(url);
        this.logger.log(`File deleted: ${url}`);
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(storage_factory_1.STORAGE_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object, image_processor_service_1.ImageProcessorService])
], StorageService);
//# sourceMappingURL=storage.service.js.map