import { LoyaltyService } from '../services/loyalty.service';
export declare class AdminLoyaltyController {
    private readonly loyaltyService;
    constructor(loyaltyService: LoyaltyService);
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
