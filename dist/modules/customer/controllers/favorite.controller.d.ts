import { FavoriteService } from '../services/favorite.service';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    getFavorites(user: {
        id: number;
    }): Promise<{
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
    }[]>;
    toggleFavorite(user: {
        id: number;
    }, productId: number): Promise<{
        message: string;
        isFavorite: boolean;
    }>;
}
