import { OrderService } from '../services/order.service';
import { OrderFilterDto } from '../dto/order-filter.dto';
import { UpdateOrderStatusDto } from '../dto/order-status.dto';
export declare class AdminOrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(filters: OrderFilterDto): Promise<({
        customer: {
            id: number;
            guid: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            createdBy: string | null;
            updatedBy: string | null;
            phone: string;
            passwordHash: string;
            status: import(".prisma/client").$Enums.CustomerStatus;
            loyaltyPoints: number;
            hashedRefreshToken: string | null;
            profileImageUrl: string | null;
            totalOrders: number;
            completedOrders: number;
            cancelledOrders: number;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            lastOrderDate: Date | null;
        };
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
                nameAr: string;
                nameEn: string;
            };
            extras: ({
                extra: {
                    nameAr: string;
                    nameEn: string;
                    price: import("@prisma/client/runtime/library").Decimal;
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
    } & {
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
    })[]>;
    getOrderDetails(id: number): Promise<{
        customer: {
            id: number;
            guid: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            createdBy: string | null;
            updatedBy: string | null;
            phone: string;
            passwordHash: string;
            status: import(".prisma/client").$Enums.CustomerStatus;
            loyaltyPoints: number;
            hashedRefreshToken: string | null;
            profileImageUrl: string | null;
            totalOrders: number;
            completedOrders: number;
            cancelledOrders: number;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            lastOrderDate: Date | null;
        };
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
                isDeleted: boolean;
                nameAr: string;
                nameEn: string;
                descriptionAr: string | null;
                descriptionEn: string | null;
                isFeatured: boolean;
                createdBy: string | null;
                updatedBy: string | null;
                productCode: string;
                categoryId: number;
                mainImage: string | null;
                basePrice: import("@prisma/client/runtime/library").Decimal;
                discountPrice: import("@prisma/client/runtime/library").Decimal | null;
                preparationTime: number;
                calories: number | null;
                sortOrder: number;
                isAvailable: boolean;
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
                    isDeleted: boolean;
                    nameAr: string;
                    nameEn: string;
                    createdBy: string | null;
                    sortOrder: number;
                    isAvailable: boolean;
                    imageUrl: string | null;
                    extraGroupId: number;
                    price: import("@prisma/client/runtime/library").Decimal;
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
        activityLogs: {
            id: number;
            createdAt: Date;
            customerId: string | null;
            orderId: number;
            adminId: string | null;
            action: import(".prisma/client").$Enums.OrderAction;
            details: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
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
    changeStatus(id: number, dto: UpdateOrderStatusDto, user: {
        id: string;
    }): Promise<{
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
