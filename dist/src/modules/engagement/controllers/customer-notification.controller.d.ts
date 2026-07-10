import { NotificationService } from '../services/notification.service';
export declare class CustomerNotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(user: {
        id: number;
    }): Promise<{
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
