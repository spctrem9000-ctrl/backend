import { HomeBuilderService } from '../services/home-builder.service';
export declare class AdminHomeController {
    private readonly homeBuilderService;
    constructor(homeBuilderService: HomeBuilderService);
    getLayout(): Promise<({
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
    reorderSections(body: {
        orderedIds: number[];
    }): Promise<{
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
}
