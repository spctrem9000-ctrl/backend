import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class BannerService {
    private prisma;
    constructor(prisma: PrismaService);
    private mapBanner;
    getAdminBanners(): Promise<any[]>;
    getActiveBanners(): Promise<any[]>;
    createBanner(data: any): Promise<any>;
    updateBanner(id: number, data: any): Promise<any>;
    deleteBanner(id: number): Promise<any>;
    reorderBanners(orderedIds: number[]): Promise<{
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
}
