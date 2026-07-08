import { Module } from '@nestjs/common';
import { HomeBuilderService } from './services/home-builder.service';
import { AdminHomeController } from './controllers/admin-home.controller';
import { CustomerHomeController } from './controllers/customer-home.controller';

@Module({
  controllers: [AdminHomeController, CustomerHomeController],
  providers: [HomeBuilderService],
  exports: [HomeBuilderService],
})
export class CmsModule {}
