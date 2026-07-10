import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class LoyaltyService {
    private prisma;
    constructor(prisma: PrismaService);
    getBalance(customerId: number): Promise<{
        points: number;
    }>;
    getHistory(customerId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        customerId: number;
        points: number;
        type: import(".prisma/client").$Enums.LoyaltyTransactionType;
        orderId: number | null;
        reason: string | null;
        adminId: string | null;
    }[]>;
    earnPoints(customerId: number, points: number, orderId?: number): Promise<void>;
    redeemPoints(customerId: number, points: number, orderId?: number): Promise<void>;
    getConfig(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateConfig(config: any): Promise<{
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
    }>;
    getAllTransactions(): Promise<({
        customer: {
            name: string;
            phone: string;
        };
    } & {
        id: number;
        guid: string;
        createdAt: Date;
        customerId: number;
        points: number;
        type: import(".prisma/client").$Enums.LoyaltyTransactionType;
        orderId: number | null;
        reason: string | null;
        adminId: string | null;
    })[]>;
    manualAdjustment(data: {
        customerId: number;
        points: number;
        reason: string;
        adminId?: string;
    }): Promise<{
        success: boolean;
    }>;
}
