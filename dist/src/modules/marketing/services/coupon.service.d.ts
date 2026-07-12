import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdminCoupons(): Promise<({
        targetProducts: ({
            product: {
                id: number;
                nameEn: string;
            };
        } & {
            productId: number;
            couponId: number;
        })[];
        targetCategories: ({
            category: {
                id: number;
                nameEn: string;
            };
        } & {
            couponId: number;
            categoryId: number;
        })[];
        targetCustomers: ({
            customer: {
                id: number;
                name: string;
                phone: string;
            };
        } & {
            customerId: number;
            couponId: number;
        })[];
    } & {
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
    })[]>;
    createCoupon(data: any): Promise<{
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
    }>;
    updateCoupon(id: number, data: any): Promise<{
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
    }>;
    deleteCoupon(id: number): Promise<{
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
    }>;
}
