import { OrderStatus, OrderType, PaymentMethod } from '@prisma/client';
export declare class OrderFilterDto {
    query?: string;
    status?: OrderStatus;
    orderType?: OrderType;
    paymentMethod?: PaymentMethod;
}
