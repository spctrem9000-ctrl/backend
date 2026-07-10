import { ConfigService } from '@nestjs/config';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
export declare class R2StorageProvider implements IStorageProvider {
    private configService;
    private readonly logger;
    private s3Client;
    private bucket;
    private publicUrl;
    constructor(configService: ConfigService);
    uploadFile(file: Buffer, filename: string, folder: string, mimeType: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
