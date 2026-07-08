import { PrismaService } from '../../../core/prisma/prisma.service';
import { ActivityAction } from '@prisma/client';
export declare class ProductHistoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    logAction(productId: number, action: ActivityAction, adminId: string, details?: any): Promise<void>;
    recordPriceChange(productId: number, oldPrice: number, newPrice: number, adminId: string, reason?: string): Promise<void>;
}
