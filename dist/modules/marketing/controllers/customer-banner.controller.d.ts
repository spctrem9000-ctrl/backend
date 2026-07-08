import { BannerService } from '../services/banner.service';
export declare class CustomerBannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    getBanners(): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        titleAr: string | null;
        titleEn: string | null;
        sortOrder: number;
        isActive: boolean;
        imageUrl: string;
        targetType: import(".prisma/client").$Enums.BannerTargetType;
        subtitleAr: string | null;
        subtitleEn: string | null;
        buttonText: string | null;
        targetId: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
}
