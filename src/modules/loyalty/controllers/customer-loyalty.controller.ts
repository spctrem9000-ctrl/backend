import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoyaltyService } from '../services/loyalty.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Loyalty')
@Controller('customer/loyalty')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerLoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get current point balance' })
  getBalance(@CurrentUser() user: { id: number }) {
    return this.loyaltyService.getBalance(user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get transaction history' })
  getHistory(@CurrentUser() user: { id: number }) {
    return this.loyaltyService.getHistory(user.id);
  }
}
