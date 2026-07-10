import type { IStorageProvider } from '../interfaces/storage-provider.interface';
import { ImageProcessorService } from './image-processor.service';
export interface StorageUrls {
    originalUrl: string;
    mediumUrl: string;
    thumbnailUrl: string;
}
export declare class StorageService {
    private readonly storageProvider;
    private readonly imageProcessor;
    private readonly logger;
    constructor(storageProvider: IStorageProvider, imageProcessor: ImageProcessorService);
    uploadSingle(file: Express.Multer.File, folder: string): Promise<StorageUrls>;
    uploadMultiple(files: Express.Multer.File[], folder: string): Promise<StorageUrls[]>;
    delete(url: string): Promise<void>;
}
