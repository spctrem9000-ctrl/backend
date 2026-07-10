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
var R2StorageProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2StorageProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
let R2StorageProvider = R2StorageProvider_1 = class R2StorageProvider {
    configService;
    logger = new common_1.Logger(R2StorageProvider_1.name);
    s3Client;
    bucket;
    publicUrl;
    constructor(configService) {
        this.configService = configService;
        const accountId = this.configService.get('R2_ACCOUNT_ID');
        const accessKey = this.configService.get('R2_ACCESS_KEY');
        const secretKey = this.configService.get('R2_SECRET_KEY');
        this.bucket = this.configService.get('R2_BUCKET') || '';
        this.publicUrl = this.configService.get('R2_PUBLIC_URL') || '';
        const endpoint = this.configService.get('R2_ENDPOINT') ||
            `https://${accountId}.r2.cloudflarestorage.com`;
        if (!accountId || !accessKey || !secretKey || !this.bucket) {
            this.logger.warn('R2 configuration is incomplete. Storage module may fail if R2 driver is active.');
        }
        else {
            this.s3Client = new client_s3_1.S3Client({
                region: 'auto',
                endpoint: endpoint,
                credentials: {
                    accessKeyId: accessKey,
                    secretAccessKey: secretKey,
                },
            });
        }
    }
    async uploadFile(file, filename, folder, mimeType) {
        try {
            const key = `${folder}/${filename}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: mimeType,
            });
            await this.s3Client.send(command);
            return `${this.publicUrl}/${key}`;
        }
        catch (err) {
            const error = err;
            this.logger.error(`R2 Upload Error: ${error.message}`, error.stack);
            throw new common_1.InternalServerErrorException('Cloud storage upload failed');
        }
    }
    async deleteFile(fileUrl) {
        try {
            if (!fileUrl.startsWith(this.publicUrl))
                return;
            const key = fileUrl.replace(`${this.publicUrl}/`, '');
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            await this.s3Client.send(command);
            this.logger.log(`Deleted R2 file: ${key}`);
        }
        catch (err) {
            const error = err;
            this.logger.error(`R2 Delete Error: ${error.message}`, error.stack);
        }
    }
};
exports.R2StorageProvider = R2StorageProvider;
exports.R2StorageProvider = R2StorageProvider = R2StorageProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], R2StorageProvider);
//# sourceMappingURL=r2-storage.provider.js.map