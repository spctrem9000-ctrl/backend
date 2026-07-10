export declare class ProductImageDto {
    imageUrl: string;
    sortOrder?: number;
}
export declare class CreateProductDto {
    productCode?: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    categoryId: number;
    mainImage?: string;
    galleryImages?: ProductImageDto[];
    gallery?: string[];
    basePrice: number;
    discountPrice?: number;
    preparationTime?: number;
    calories?: number;
    sortOrder?: number;
    isAvailable?: boolean;
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isNew?: boolean;
    isOffer?: boolean;
}
