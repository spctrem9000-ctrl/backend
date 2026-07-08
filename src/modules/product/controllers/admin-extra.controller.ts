import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExtraService } from '../services/extra.service';
import { CreateExtraGroupDto } from '../dto/create-extra-group.dto';
import { UpdateExtraGroupDto } from '../dto/update-extra-group.dto';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Admin Extras')
@Controller('admin/extras')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post('groups')
  @ApiOperation({ summary: 'Create new Extra Group' })
  createGroup(
    @Body() dto: CreateExtraGroupDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.createGroup(dto, user.id);
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get all Extra Groups' })
  getGroups() {
    return this.extraService.getGroups(true);
  }

  @Patch('groups/:id')
  @ApiOperation({ summary: 'Update Extra Group' })
  updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExtraGroupDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.updateGroup(id, dto, user.id);
  }

  @Delete('groups/:id')
  @ApiOperation({ summary: 'Delete Extra Group' })
  deleteGroup(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.deleteGroup(id, user.id);
  }

  @Post('groups/:groupId/items')
  @ApiOperation({ summary: 'Add Extra to Group' })
  createExtra(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() dto: CreateExtraDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.createExtra(groupId, dto, user.id);
  }

  @Patch('items/:id')
  @ApiOperation({ summary: 'Update Extra' })
  updateExtra(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExtraDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.updateExtra(id, dto, user.id);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Delete Extra' })
  deleteExtra(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.extraService.deleteExtra(id, user.id);
  }

  @Post('products/:productId/groups/:groupId')
  @ApiOperation({ summary: 'Link Extra Group to Product' })
  linkGroupToProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.extraService.linkGroupToProduct(productId, groupId);
  }

  @Delete('products/:productId/groups/:groupId')
  @ApiOperation({ summary: 'Unlink Extra Group from Product' })
  unlinkGroupFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.extraService.unlinkGroupFromProduct(productId, groupId);
  }
}
