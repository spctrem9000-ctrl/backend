import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BannerService } from '../services/banner.service';

@ApiTags('Customer Banners')
@Controller('customer/banners')
export class CustomerBannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get active banners' })
  getBanners() {
    return this.bannerService.getActiveBanners();
  }
}
