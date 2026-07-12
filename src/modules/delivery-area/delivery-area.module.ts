import { Module } from '@nestjs/common';
import { DeliveryAreaService } from './services/delivery-area.service';
import {
  AdminDeliveryAreaController,
  CustomerDeliveryAreaController,
} from './controllers/delivery-area.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminDeliveryAreaController, CustomerDeliveryAreaController],
  providers: [DeliveryAreaService],
  exports: [DeliveryAreaService],
})
export class DeliveryAreaModule {}
