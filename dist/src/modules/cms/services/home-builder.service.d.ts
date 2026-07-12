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
            productId: number;
            sortOrder: number;
            homeSectionId: number;
        })[];
    } & {
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    })[]>;
    getHomeLayout(): Promise<({
        customProducts: ({
            product: {
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
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    })[]>;
    createSection(data: any): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    }>;
    updateSection(id: number, data: any): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    }>;
    deleteSection(id: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    }>;
    reorderSections(orderedIds: number[]): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.HomeSectionType;
        titleAr: string | null;
        titleEn: string | null;
        maxItems: number;
        sortOrder: number;
    }[]>;
}
