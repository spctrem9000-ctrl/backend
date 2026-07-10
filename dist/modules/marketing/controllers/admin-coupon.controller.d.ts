import { CouponService } from '../services/coupon.service';
export declare class AdminCouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    getCoupons(): Promise<({
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
                name: string;
                id: number;
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
    })[]>;
    createCoupon(data: any): Promise<{
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
    }>;
    updateCoupon(id: number, data: any): Promise<{
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
    }>;
    deleteCoupon(id: number): Promise<{
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
    }>;
}
