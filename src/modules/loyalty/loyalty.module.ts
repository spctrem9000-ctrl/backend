import { Module } from '@nestjs/common';
import { LoyaltyService } from './services/loyalty.service';
import { AdminLoyaltyController } from './controllers/admin-loyalty.controller';
import { CustomerLoyaltyController } from './controllers/customer-loyalty.controller';

@Module({
  controllers: [AdminLoyaltyController, CustomerLoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
