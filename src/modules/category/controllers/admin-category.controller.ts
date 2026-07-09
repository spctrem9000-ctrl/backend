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
  Query,
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { UpdateDisplayOrderDto } from '../dto/update-display-order.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin-Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  create(@Body() dto: CreateCategoryDto, @CurrentUser() user: { id: string }) {
    return this.categoryService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll() {
    return this.categoryService.searchCategories('');
  }

  @Get('search')
  @ApiOperation({ summary: 'Search categories by name' })
  search(@Query('q') query: string) {
    return this.categoryService.searchCategories(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category details' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getDetails(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category details' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a category' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.delete(id, user.id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a deleted category' })
  restore(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.restore(id, user.id);
  }

  @Put(':id/order')
  @ApiOperation({ summary: 'Change display order' })
  changeOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDisplayOrderDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.changeDisplayOrder(
      id,
      dto.displayOrder,
      user.id,
    );
  }

  @Post(':id/enable')
  @ApiOperation({ summary: 'Enable category' })
  enable(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.toggleActive(id, true, user.id);
  }

  @Post(':id/disable')
  @ApiOperation({ summary: 'Disable category' })
  disable(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.categoryService.toggleActive(id, false, user.id);
  }
}
