import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
export declare class AdminProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDto, user: {
        id: string;
    }): Promise<{
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
    }>;
    findAll(filters: ProductFilterDto): Promise<({
        category: {
            id: number;
            nameAr: string;
            nameEn: string;
        };
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            guid: string;
            nameAr: string;
            nameEn: string;
            descriptionAr: string | null;
            descriptionEn: string | null;
            isFeatured: boolean;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            isActive: boolean;
            categoryCode: string;
            image: string | null;
            displayOrder: number;
        };
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        priceHistory: {
            id: number;
            createdAt: Date;
            productId: number;
            reason: string | null;
            oldPrice: import("@prisma/client/runtime/library").Decimal;
            newPrice: import("@prisma/client/runtime/library").Decimal;
            changedBy: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
        extraGroups: ({
            extraGroup: {
                extras: {
                    id: number;
                    guid: string;
                    nameAr: string;
                    nameEn: string;
                    sortOrder: number;
                    isAvailable: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string | null;
                    isDeleted: boolean;
                    imageUrl: string | null;
                    extraGroupId: number;
                    price: import("@prisma/client/runtime/library").Decimal;
                }[];
            } & {
                id: number;
                guid: string;
                nameAr: string;
                nameEn: string;
                sortOrder: number;
                isAvailable: boolean;
                createdAt: Date;
                updatedAt: Date;
                createdBy: string | null;
                isDeleted: boolean;
                selectionType: import(".prisma/client").$Enums.SelectionType;
                isRequired: boolean;
                minSelection: number;
                maxSelection: number;
            };
        } & {
            createdAt: Date;
            productId: number;
            extraGroupId: number;
        })[];
    } & {
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
    }>;
    update(id: number, dto: UpdateProductDto, user: {
        id: string;
    }): Promise<{
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
    } & {
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
    }>;
    remove(id: number, user: {
        id: string;
    }): Promise<{
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
    } & {
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
    }>;
    restore(id: number, user: {
        id: string;
    }): Promise<{
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
    } & {
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
    }>;
    duplicate(id: number, user: {
        id: string;
    }): Promise<{
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
    }>;
    toggleStatus(id: number, isAvailable: boolean, user: {
        id: string;
    }): Promise<{
        images: {
            id: number;
            sortOrder: number;
            createdAt: Date;
            productId: number;
            imageUrl: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            conversionRate: number;
        } | null;
    } & {
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
    }>;
}
