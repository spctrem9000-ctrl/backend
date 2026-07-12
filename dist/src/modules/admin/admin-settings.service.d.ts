import { PrismaService } from '../../core/prisma/prisma.service';
export declare class AdminSettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllSettings(): Promise<{
        success: boolean;
        data: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            createdBy: string | null;
            updatedBy: string | null;
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
            isDeleted: boolean;
            createdBy: string | null;
            updatedBy: string | null;
            description: string | null;
            value: import("@prisma/client/runtime/library").JsonValue;
            key: string;
        };
    }>;
    updateSetting(key: string, value: any): Promise<{
        success: boolean;
        data: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            createdBy: string | null;
            updatedBy: string | null;
            description: string | null;
            value: import("@prisma/client/runtime/library").JsonValue;
            key: string;
        };
    }>;
}
