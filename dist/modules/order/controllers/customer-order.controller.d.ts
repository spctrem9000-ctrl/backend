import { OrderService } from '../services/order.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutDto } from '../dto/checkout.dto';
export declare class CustomerOrderController {
    private readonly orderService;
    private readonly checkoutService;
    constructor(orderService: OrderService, checkoutService: CheckoutService);
    checkout(user: {
        id: number;
    }, dto: CheckoutDto): Promise<{
        id: number;
        guid: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
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
    getOrders(user: {
        id: number;
    }): Promise<({
        items: ({
            product: {
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                updatedBy: string | null;
                isDeleted: boolean;
                productCode: string;
                nameAr: string;
                nameEn: string;
                descriptionAr: string | null;
                descriptionEn: string | null;
                categoryId: number;
                mainImage: string | null;
                basePrice: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                preparationTime: number;
                calories: number | null;
                sortOrder: number;
                isAvailable: boolean;
                isFeatured: boolean;
                isBestSeller: boolean;
                isNew: boolean;
                isOffer: boolean;
            };
        } & {
            id: number;
            guid: string;
            productId: number;
            orderId: number;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: number;
        guid: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
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
    })[]>;
    getOrderDetails(user: {
        id: number;
    }, id: number): Promise<{
        address: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            title: string;
            street: string;
            building: string | null;
            floor: string | null;
            apartment: string | null;
            landmark: string | null;
            latitude: number | null;
            longitude: number | null;
            isDefault: boolean;
            customerId: number;
        } | null;
        items: ({
            product: {
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                updatedBy: string | null;
                isDeleted: boolean;
                productCode: string;
                nameAr: string;
                nameEn: string;
                descriptionAr: string | null;
                descriptionEn: string | null;
                categoryId: number;
                mainImage: string | null;
                basePrice: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                preparationTime: number;
                calories: number | null;
                sortOrder: number;
                isAvailable: boolean;
                isFeatured: boolean;
                isBestSeller: boolean;
                isNew: boolean;
                isOffer: boolean;
            };
            extras: ({
                extra: {
                    id: number;
                    guid: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string | null;
                    isDeleted: boolean;
                    nameAr: string;
                    nameEn: string;
                    sortOrder: number;
                    isAvailable: boolean;
                    imageUrl: string | null;
                    price: import("@prisma/client/runtime/library").Decimal;
                    extraGroupId: number;
                };
            } & {
                id: number;
                price: import("@prisma/client/runtime/library").Decimal;
                extraId: number;
                orderItemId: number;
            })[];
        } & {
            id: number;
            guid: string;
            productId: number;
            orderId: number;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        statusHistory: {
            id: number;
            orderId: number;
            changedBy: string;
            changedAt: Date;
            oldStatus: import(".prisma/client").$Enums.OrderStatus | null;
            newStatus: import(".prisma/client").$Enums.OrderStatus;
        }[];
    } & {
        id: number;
        guid: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
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
    cancelOrder(user: {
        id: number;
    }, id: number): Promise<{
        id: number;
        guid: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
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
