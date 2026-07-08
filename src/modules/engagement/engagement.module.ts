import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { AdminNotificationController } from './controllers/admin-notification.controller';
import { CustomerNotificationController } from './controllers/customer-notification.controller';

@Module({
  controllers: [AdminNotificationController, CustomerNotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class EngagementModule {}
