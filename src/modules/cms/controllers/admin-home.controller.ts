import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HomeBuilderService } from '../services/home-builder.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Home Builder')
@Controller('admin/home')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminHomeController {
  constructor(private readonly homeBuilderService: HomeBuilderService) {}

  @Get()
  @ApiOperation({ summary: 'Get home layout sections' })
  getLayout() {
    return this.homeBuilderService.getHomeLayout();
  }
}
