import { PrismaService } from '../../../core/prisma/prisma.service';
import { CartService } from '../../cart/services/cart.service';
import { OrderNotificationService } from './order-notification.service';
import { CheckoutDto } from '../dto/checkout.dto';
export declare class CheckoutService {
    private prisma;
    private cartService;
    private notificationService;
    constructor(prisma: PrismaService, cartService: CartService, notificationService: OrderNotificationService);
    checkout(customerId: number, dto: CheckoutDto): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        status: import(".prisma/client").$Enums.OrderStatus;
        customerId: number;
        couponId: number | null;
        orderCode: string;
        orderType: import(".prisma/client").$Enums.OrderType;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        couponDiscount: import("@prisma/client/runtime/library").Decimal;
        loyaltyDiscount: import("@prisma/client/runtime/library").Decimal;
        deliveryFees: import("@prisma/client/runtime/library").Decimal;
        grandTotal: import("@prisma/client/runtime/library").Decimal;
        loyaltyPointsUsed: number;
        orderNotes: string | null;
        estimatedPrepTime: number;
        addressId: number | null;
    }>;
}
