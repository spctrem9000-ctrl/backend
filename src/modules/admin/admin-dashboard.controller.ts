import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminDashboardService } from './admin-dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Admin Analytics')
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminDashboardController {
  constructor(private readonly dashboardService: AdminDashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get Dashboard Statistics' })
  getDashboardStats() {
    return this.dashboardService.getDashboardStats();
  }
}
