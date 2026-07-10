import { OrderType, PaymentMethod } from '@prisma/client';
export declare class CheckoutDto {
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    addressId?: number;
    orderNotes?: string;
}
