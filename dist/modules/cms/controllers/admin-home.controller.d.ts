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
    createSection(data: any): Promise<{
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
    }>;
    reorderSections(body: {
        orderedIds: number[];
    }): Promise<{
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
    }[]>;
    updateSection(id: number, data: any): Promise<{
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
    }>;
    deleteSection(id: number): Promise<{
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
    }>;
}
