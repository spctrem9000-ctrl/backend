import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class ProductInsightService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    incrementViews(productId: number): Promise<void>;
    recordPurchase(productId: number, revenue: number): Promise<void>;
}
