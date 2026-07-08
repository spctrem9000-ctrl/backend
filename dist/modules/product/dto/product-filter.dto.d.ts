export declare class ProductFilterDto {
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    isAvailable?: boolean;
    isBestSeller?: boolean;
    isOffer?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'alphabetical' | 'manual';
}
