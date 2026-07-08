import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('CustomerApp-Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CustomerCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('active')
  @ApiOperation({ summary: 'Get all active categories' })
  getActiveCategories() {
    return this.categoryService.getActiveCategories();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get all featured categories' })
  getFeaturedCategories() {
    return this.categoryService.getFeaturedCategories();
  }
}
