import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HomeBuilderService } from '../services/home-builder.service';

@ApiTags('Customer Home')
@Controller('customer/home')
export class CustomerHomeController {
  constructor(private readonly homeBuilderService: HomeBuilderService) {}

  @Get()
  @ApiOperation({ summary: 'Get dynamic home layout' })
  getLayout() {
    return this.homeBuilderService.getHomeLayout();
  }
}
