import { CustomerRepository } from './customer.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CustomerStatus } from '@prisma/client';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly prisma;
    constructor(customerRepository: CustomerRepository, prisma: PrismaService);
    getProfile(customerId: number): Promise<{
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
    }>;
    getAllCustomers(): Promise<{
        notes: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            isDeleted: boolean;
            customerId: number;
            note: string;
        }[];
        tags: ({
            tag: {
                name: string;
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                isDeleted: boolean;
                colorHex: string | null;
            };
        } & {
            customerId: number;
            tagId: number;
        })[];
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
    }[]>;
    updateProfile(customerId: number, updateDto: UpdateProfileDto): Promise<{
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
    }>;
    softDeleteAccount(customerId: number): Promise<{
        message: string;
    }>;
    getAdminCustomerDetails(customerId: number): Promise<{
        riskScore: string;
        segments: string[];
        statistics: {
            totalLoyaltyEarned: number;
            totalCouponsUsed: number;
            averageOrderValue: number;
        };
        addresses: {
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
        }[];
        notes: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            isDeleted: boolean;
            customerId: number;
            note: string;
        }[];
        tags: ({
            tag: {
                name: string;
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                isDeleted: boolean;
                colorHex: string | null;
            };
        } & {
            customerId: number;
            tagId: number;
        })[];
        favorites: ({
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
            createdAt: Date;
            customerId: number;
            productId: number;
        })[];
        orders: {
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
        }[];
        loyaltyHistory: {
            id: number;
            guid: string;
            createdAt: Date;
            customerId: number;
            points: number;
            type: import(".prisma/client").$Enums.LoyaltyTransactionType;
            orderId: number | null;
            reason: string | null;
            adminId: string | null;
        }[];
        couponUsages: ({
            coupon: {
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                couponType: import(".prisma/client").$Enums.CouponType;
                discountPercent: import("@prisma/client/runtime/library").Decimal | null;
                fixedDiscount: import("@prisma/client/runtime/library").Decimal | null;
                maxDiscountAmount: import("@prisma/client/runtime/library").Decimal | null;
                minOrderAmount: import("@prisma/client/runtime/library").Decimal | null;
                validFrom: Date | null;
                validTo: Date | null;
                usageLimit: number | null;
                usageCount: number;
                usagePerCustomer: number | null;
                isActive: boolean;
                targetType: import(".prisma/client").$Enums.CouponTargetType;
            };
        } & {
            id: number;
            customerId: number;
            couponId: number;
            orderId: number | null;
            usedAt: Date;
        })[];
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
    }>;
    getCustomerTimeline(customerId: number): Promise<{
        type: string;
        date: Date;
        description: string;
        action: string;
    }[]>;
    updateCustomerStatus(customerId: number, status: CustomerStatus): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.CustomerStatus;
    }>;
}
