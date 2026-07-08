import { OrderStatus } from '@prisma/client';
export declare class OrderNotificationService {
    private readonly logger;
    notifyNewOrder(orderId: number, orderCode: string): Promise<void>;
    notifyStatusChange(orderId: number, orderCode: string, newStatus: OrderStatus): Promise<void>;
    notifyOrderCancelled(orderId: number, orderCode: string): Promise<void>;
}
