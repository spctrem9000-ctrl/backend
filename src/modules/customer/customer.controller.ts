import { Controller, Get, Put, Body, UseGuards, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('CustomerApp-Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current customer profile' })
  getProfile(@CurrentUser() user: { id: number }) {
    return this.customerService.getProfile(user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update customer profile' })
  updateProfile(
    @CurrentUser() user: { id: number },
    @Body() updateDto: UpdateProfileDto,
  ) {
    return this.customerService.updateProfile(user.id, updateDto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete customer account (Soft Delete)' })
  deleteAccount(@CurrentUser() user: { id: number }) {
    return this.customerService.softDeleteAccount(user.id);
  }
}
