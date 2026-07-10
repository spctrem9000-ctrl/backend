import { LoyaltyService } from '../services/loyalty.service';
export declare class CustomerLoyaltyController {
    private readonly loyaltyService;
    constructor(loyaltyService: LoyaltyService);
    getBalance(user: {
        id: number;
    }): Promise<{
        points: number;
    }>;
    getHistory(user: {
        id: number;
    }): Promise<{
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
