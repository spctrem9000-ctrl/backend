"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageFactory = exports.STORAGE_PROVIDER_TOKEN = void 0;
const config_1 = require("@nestjs/config");
const local_storage_provider_1 = require("./providers/local-storage.provider");
const r2_storage_provider_1 = require("./providers/r2-storage.provider");
exports.STORAGE_PROVIDER_TOKEN = 'STORAGE_PROVIDER';
exports.storageFactory = {
    provide: exports.STORAGE_PROVIDER_TOKEN,
    useFactory: (configService) => {
        const driver = configService.get('STORAGE_DRIVER') || 'local';
        if (driver === 'r2') {
            return new r2_storage_provider_1.R2StorageProvider(configService);
        }
        return new local_storage_provider_1.LocalStorageProvider(configService);
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=storage.factory.js.map