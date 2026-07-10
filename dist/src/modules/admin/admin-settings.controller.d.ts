import { AdminSettingsService } from './admin-settings.service';
export declare class AdminSettingsController {
    private readonly settingsService;
    constructor(settingsService: AdminSettingsService);
    getAllSettings(): Promise<{
        success: boolean;
        data: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            description: string | null;
            value: import("@prisma/client/runtime/library").JsonValue;
            key: string;
        }[];
    }>;
    getSetting(key: string): Promise<{
        success: boolean;
        data: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            description: string | null;
            value: import("@prisma/client/runtime/library").JsonValue;
            key: string;
        };
    }>;
    updateSetting(key: string, body: any): Promise<{
        success: boolean;
        data: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            description: string | null;
            value: import("@prisma/client/runtime/library").JsonValue;
            key: string;
        };
    }>;
}
