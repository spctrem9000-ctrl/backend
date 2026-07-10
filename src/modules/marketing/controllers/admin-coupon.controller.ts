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
import { CouponService } from '../services/coupon.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Coupons')
@Controller('admin/coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminCouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  @ApiOperation({ summary: 'Get all coupons' })
  getCoupons() {
    return this.couponService.getAdminCoupons();
  }

  @Post()
  @ApiOperation({ summary: 'Create coupon' })
  createCoupon(@Body() data: any) {
    return this.couponService.createCoupon(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update coupon' })
  updateCoupon(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.couponService.updateCoupon(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete coupon' })
  deleteCoupon(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.deleteCoupon(id);
  }
}
