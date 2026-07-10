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
    return this.homeBuilderService.getAdminLayout();
  }

  @Post()
  @ApiOperation({ summary: 'Create section' })
  createSection(@Body() data: any) {
    return this.homeBuilderService.createSection(data);
  }

  @Put('reorder')
  @ApiOperation({ summary: 'Reorder sections' })
  reorderSections(@Body() body: { orderedIds: number[] }) {
    return this.homeBuilderService.reorderSections(body.orderedIds);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update section' })
  updateSection(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.homeBuilderService.updateSection(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete section' })
  deleteSection(@Param('id', ParseIntPipe) id: number) {
    return this.homeBuilderService.deleteSection(id);
  }
}
