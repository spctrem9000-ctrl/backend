import { PrismaService } from '../../core/prisma/prisma.service';
export declare class AdminDashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        todaysOrders: number;
        todaysRevenue: number | import("@prisma/client/runtime/library").Decimal;
        pendingOrders: number;
        lowStock: number;
        latestOrders: {
            id: number;
            orderCode: string;
            customerName: string;
            amount: number;
            createdAt: Date;
        }[];
        topProducts: {
            id: number;
            name: string;
            image: string | null;
            sales: number;
        }[];
    }>;
}
