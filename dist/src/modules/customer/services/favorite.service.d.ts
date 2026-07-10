import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class FavoriteService {
    private prisma;
    constructor(prisma: PrismaService);
    toggleFavorite(customerId: number, productId: number): Promise<{
        message: string;
        isFavorite: boolean;
    }>;
    getFavorites(customerId: number): Promise<{
        id: number;
        guid: string;
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
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
    }[]>;
}
