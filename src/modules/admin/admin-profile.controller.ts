import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminProfileService } from './admin-profile.service';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/admin-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Admin Profile')
@Controller('admin/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminProfileController {
  constructor(private readonly profileService: AdminProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get current admin profile' })
  getProfile(@CurrentUser() user: { id: string }) {
    return this.profileService.getProfile(user.id);
  }

  @Put()
  @ApiOperation({ summary: 'Update admin profile' })
  updateProfile(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.id, dto.name, dto.email);
  }

  @Put('password')
  @ApiOperation({ summary: 'Change admin password' })
  changePassword(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.profileService.updatePassword(
      user.id,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
