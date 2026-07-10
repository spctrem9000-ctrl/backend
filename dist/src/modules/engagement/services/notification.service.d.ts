import { PrismaService } from '../../../core/prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    getCustomerNotifications(customerId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        customerId: number;
        type: import(".prisma/client").$Enums.NotificationType;
        titleAr: string;
        titleEn: string;
        messageAr: string;
        messageEn: string;
        isRead: boolean;
        readAt: Date | null;
    }[]>;
}
