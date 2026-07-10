import { LoyaltyService } from '../services/loyalty.service';
export declare class AdminLoyaltyController {
    private readonly loyaltyService;
    constructor(loyaltyService: LoyaltyService);
    getConfig(): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateConfig(data: any): Promise<{
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
    getHistory(id: number): Promise<{
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
}
