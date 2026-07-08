import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdminCoupons(): Promise<({
        targetProducts: ({
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
            productId: number;
            couponId: number;
        })[];
        targetCategories: ({
            category: {
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                updatedBy: string | null;
                isDeleted: boolean;
                nameAr: string;
                nameEn: string;
                descriptionAr: string | null;
                descriptionEn: string | null;
                isFeatured: boolean;
                categoryCode: string;
                image: string | null;
                displayOrder: number;
                isActive: boolean;
            };
        } & {
            couponId: number;
            categoryId: number;
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
}
