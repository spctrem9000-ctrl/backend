import { BannerService } from '../services/banner.service';
export declare class AdminBannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    getBanners(): Promise<any[]>;
    createBanner(data: any): Promise<any>;
    reorderBanners(body: {
        orderedIds: number[];
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        titleAr: string | null;
        titleEn: string | null;
        targetType: import(".prisma/client").$Enums.BannerTargetType;
        sortOrder: number;
        imageUrl: string;
        targetId: string | null;
        subtitleAr: string | null;
        subtitleEn: string | null;
        buttonText: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
    updateBanner(id: number, data: any): Promise<any>;
    deleteBanner(id: number): Promise<any>;
}
