import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Product, ActivityAction } from '@prisma/client';
import { ProductFilterDto } from './dto/product-filter.dto';
export declare class ProductRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    findById(id: number, includeDeleted?: boolean): Promise<({
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
            oldPrice: Prisma.Decimal;
            newPrice: Prisma.Decimal;
            changedBy: string;
        }[];
        insight: {
            id: number;
            updatedAt: Date;
            productId: number;
            views: number;
            addedToCart: number;
            purchased: number;
            revenue: Prisma.Decimal;
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
                    price: Prisma.Decimal;
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
        basePrice: Prisma.Decimal;
        discountPrice: Prisma.Decimal | null;
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
    }) | null>;
    findByCode(productCode: string): Promise<Product | null>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<{
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
            revenue: Prisma.Decimal;
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
        basePrice: Prisma.Decimal;
        discountPrice: Prisma.Decimal | null;
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
    findAll(filters: ProductFilterDto, isAdmin?: boolean): Promise<({
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
            revenue: Prisma.Decimal;
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
        basePrice: Prisma.Decimal;
        discountPrice: Prisma.Decimal | null;
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
    logActivity(productId: number, action: ActivityAction, adminId: string, details?: any): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        adminId: string;
        action: import(".prisma/client").$Enums.ActivityAction;
        details: Prisma.JsonValue | null;
    }>;
    recordPriceChange(productId: number, oldPrice: number, newPrice: number, adminId: string, reason?: string): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        reason: string | null;
        oldPrice: Prisma.Decimal;
        newPrice: Prisma.Decimal;
        changedBy: string;
    }>;
}
