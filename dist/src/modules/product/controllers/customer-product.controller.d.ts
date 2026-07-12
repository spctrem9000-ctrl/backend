import { ProductService } from '../services/product.service';
import { ProductFilterDto } from '../dto/product-filter.dto';
export declare class CustomerProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(filters: ProductFilterDto): Promise<({
        category: {
            id: number;
            nameAr: string;
            nameEn: string;
        };
        images: {
            id: number;
            createdAt: Date;
            productId: number;
            sortOrder: number;
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
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            categoryCode: string;
            nameAr: string;
            nameEn: string;
            descriptionAr: string | null;
            descriptionEn: string | null;
            image: string | null;
            displayOrder: number;
            isActive: boolean;
            isFeatured: boolean;
            createdBy: string | null;
            updatedBy: string | null;
        };
        images: {
            id: number;
            createdAt: Date;
            productId: number;
            sortOrder: number;
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
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    nameAr: string;
                    nameEn: string;
                    createdBy: string | null;
                    sortOrder: number;
                    isAvailable: boolean;
                    imageUrl: string | null;
                    extraGroupId: number;
                    price: import("@prisma/client/runtime/library").Decimal;
                }[];
            } & {
                id: number;
                guid: string;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                nameAr: string;
                nameEn: string;
                createdBy: string | null;
                sortOrder: number;
                isAvailable: boolean;
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
    }>;
}
