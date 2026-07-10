"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ImageProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessorService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
let ImageProcessorService = ImageProcessorService_1 = class ImageProcessorService {
    logger = new common_1.Logger(ImageProcessorService_1.name);
    async processImage(buffer) {
        try {
            const filename = `${(0, uuid_1.v4)()}.webp`;
            const original = await (0, sharp_1.default)(buffer).webp({ quality: 80 }).toBuffer();
            const medium = await (0, sharp_1.default)(buffer)
                .resize({ width: 600, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
            const thumbnail = await (0, sharp_1.default)(buffer)
                .resize({ width: 150, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
            return { original, medium, thumbnail, filename };
        }
        catch (err) {
            const error = err;
            this.logger.error(`Image processing failed: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Image processing failed');
        }
    }
};
exports.ImageProcessorService = ImageProcessorService;
exports.ImageProcessorService = ImageProcessorService = ImageProcessorService_1 = __decorate([
    (0, common_1.Injectable)()
], ImageProcessorService);
//# sourceMappingURL=image-processor.service.js.map