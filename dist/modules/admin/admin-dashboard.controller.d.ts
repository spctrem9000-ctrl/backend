import { AdminDashboardService } from './admin-dashboard.service';
export declare class AdminDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: AdminDashboardService);
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
