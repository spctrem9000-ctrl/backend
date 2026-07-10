import { ConfigService } from '@nestjs/config';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
export declare class LocalStorageProvider implements IStorageProvider {
    private configService;
    private readonly logger;
    private readonly uploadsDir;
    private readonly publicUrl;
    constructor(configService: ConfigService);
    uploadFile(file: Buffer, filename: string, folder: string, mimeType: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
