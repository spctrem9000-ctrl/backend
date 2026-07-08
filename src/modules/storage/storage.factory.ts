import { ConfigService } from '@nestjs/config';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { R2StorageProvider } from './providers/r2-storage.provider';

export const STORAGE_PROVIDER_TOKEN = 'STORAGE_PROVIDER';

export const storageFactory = {
  provide: STORAGE_PROVIDER_TOKEN,
  useFactory: (configService: ConfigService) => {
    const driver = configService.get<string>('STORAGE_DRIVER') || 'local';

    if (driver === 'r2') {
      return new R2StorageProvider(configService);
    }

    return new LocalStorageProvider(configService);
  },
  inject: [ConfigService],
};
