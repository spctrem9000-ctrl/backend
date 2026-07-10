import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class HomeBuilderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdminLayout(): Promise<({
        customProducts: ({
            product: {
                id: number;
                nameAr: string;
                nameEn: string;
                mainImage: string | null;
            };
        } & {
            sortOrder: number;
            productId: number;
            homeSectionId: number;
        })[];
    } & {
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    })[]>;
    getHomeLayout(): Promise<({
        customProducts: ({
            product: {
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
            };
        } & {
            sortOrder: number;
            productId: number;
            homeSectionId: number;
        })[];
    } & {
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    })[]>;
    createSection(data: any): Promise<{
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    }>;
    updateSection(id: number, data: any): Promise<{
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    }>;
    deleteSection(id: number): Promise<{
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    }>;
    reorderSections(orderedIds: number[]): Promise<{
        id: number;
        guid: string;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        isActive: boolean;
    }[]>;
}
