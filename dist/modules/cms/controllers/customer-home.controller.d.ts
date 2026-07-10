import { HomeBuilderService } from '../services/home-builder.service';
export declare class CustomerHomeController {
    private readonly homeBuilderService;
    constructor(homeBuilderService: HomeBuilderService);
    getLayout(): Promise<({
        customProducts: ({
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
            sortOrder: number;
            homeSectionId: number;
        })[];
    } & {
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
        sortOrder: number;
    })[]>;
}
