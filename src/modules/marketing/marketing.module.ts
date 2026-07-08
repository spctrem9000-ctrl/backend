import { Module } from '@nestjs/common';
import { CouponService } from './services/coupon.service';
import { BannerService } from './services/banner.service';
import { AdminCouponController } from './controllers/admin-coupon.controller';
import { AdminBannerController } from './controllers/admin-banner.controller';
import { CustomerBannerController } from './controllers/customer-banner.controller';

@Module({
  controllers: [
    AdminCouponController,
    AdminBannerController,
    CustomerBannerController,
  ],
  providers: [CouponService, BannerService],
  exports: [CouponService],
})
export class MarketingModule {}
