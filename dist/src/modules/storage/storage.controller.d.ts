import { StorageService } from './services/storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadSingle(file: Express.Multer.File, folder: string): Promise<import("./services/storage.service").StorageUrls>;
    uploadMultiple(files: Express.Multer.File[], folder: string): Promise<import("./services/storage.service").StorageUrls[]>;
    deleteFile(url: string): Promise<{
        message: string;
    }>;
}
