import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoyaltyService } from '../services/loyalty.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Loyalty')
@Controller('admin/loyalty')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminLoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get loyalty config' })
  getConfig() {
    return this.loyaltyService.getConfig();
  }

  @Put('config')
  @ApiOperation({ summary: 'Update loyalty config' })
  updateConfig(@Body() data: any) {
    return this.loyaltyService.updateConfig(data);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions' })
  getAllTransactions() {
    return this.loyaltyService.getAllTransactions();
  }

  @Post('adjustment')
  @ApiOperation({ summary: 'Manual point adjustment' })
  manualAdjustment(
    @Body()
    data: {
      customerId: number;
      points: number;
      reason: string;
      adminId?: string;
    },
  ) {
    return this.loyaltyService.manualAdjustment(data);
  }

  @Get(':customerId/history')
  @ApiOperation({ summary: 'Get customer transaction history' })
  getHistory(@Param('customerId', ParseIntPipe) id: number) {
    return this.loyaltyService.getHistory(id);
  }
}
