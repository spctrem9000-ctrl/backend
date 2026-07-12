import { TagService } from '../services/tag.service';
import { NoteService } from '../services/note.service';
import { CustomerService } from '../customer.service';
import { CustomerStatus } from '@prisma/client';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';
export declare class AdminCustomerController {
    private readonly tagService;
    private readonly noteService;
    private readonly customerService;
    constructor(tagService: TagService, noteService: NoteService, customerService: CustomerService);
    getAllCustomers(): Promise<{
        notes: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            createdBy: string | null;
            customerId: number;
            note: string;
        }[];
        tags: ({
            tag: {
                id: number;
                guid: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                createdBy: string | null;
                colorHex: string | null;
            };
        } & {
            customerId: number;
            tagId: number;
        })[];
        id: number;
        guid: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
    }[]>;
    getCustomerDetails(id: number): Promise<{
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
            isDeleted: boolean;
            createdBy: string | null;
            customerId: number;
            note: string;
        }[];
        tags: ({
            tag: {
                id: number;
                guid: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                createdBy: string | null;
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
        } & {
            createdAt: Date;
            customerId: number;
            productId: number;
        })[];
        orders: {
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
                isActive: boolean;
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
                targetType: import(".prisma/client").$Enums.CouponTargetType;
            };
        } & {
            id: number;
            customerId: number;
            couponId: number;
            orderId: number | null;
            usedAt: Date;
        })[];
        id: number;
        guid: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
    }>;
    getCustomerTimeline(id: number): Promise<{
        type: string;
        date: Date;
        description: string;
        action: string;
    }[]>;
    updateStatus(id: number, status: CustomerStatus): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.CustomerStatus;
    }>;
    createTag(dto: CreateCustomerTagDto): Promise<{
        id: number;
        guid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        colorHex: string | null;
    }>;
    getAllTags(): Promise<{
        id: number;
        guid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        colorHex: string | null;
    }[]>;
    assignTag(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    removeTag(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    getNotes(customerId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }[]>;
    addNote(customerId: number, dto: CreateCustomerNoteDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }>;
    deleteNote(noteId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }>;
}
