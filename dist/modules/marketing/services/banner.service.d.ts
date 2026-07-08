import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class BannerService {
    private prisma;
    constructor(prisma: PrismaService);
    getActiveBanners(): Promise<{
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
