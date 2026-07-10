import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BannerService } from '../services/banner.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Banners')
@Controller('admin/banners')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminBannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banners' })
  getBanners() {
    return this.bannerService.getAdminBanners();
  }

  @Post()
  @ApiOperation({ summary: 'Create banner' })
  createBanner(@Body() data: any) {
    return this.bannerService.createBanner(data);
  }

  @Put('reorder')
  @ApiOperation({ summary: 'Reorder banners' })
  reorderBanners(@Body() body: { orderedIds: number[] }) {
    return this.bannerService.reorderBanners(body.orderedIds);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update banner' })
  updateBanner(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.bannerService.updateBanner(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete banner' })
  deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.deleteBanner(id);
  }
}
