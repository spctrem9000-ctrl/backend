import { ConfigService } from '@nestjs/config';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { R2StorageProvider } from './providers/r2-storage.provider';
export declare const STORAGE_PROVIDER_TOKEN = "STORAGE_PROVIDER";
export declare const storageFactory: {
    provide: string;
    useFactory: (configService: ConfigService) => LocalStorageProvider | R2StorageProvider;
    inject: (typeof ConfigService)[];
};
