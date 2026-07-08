import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin-Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/products')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() dto: CreateProductDto, @CurrentUser() user: { id: string }) {
    return this.productService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (Admin view)' })
  findAll(@Query() filters: ProductFilterDto) {
    return this.productService.searchAdmin(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getAdminDetails(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.delete(id, user.id);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a deleted product' })
  restore(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.restore(id, user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a product' })
  duplicate(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.duplicateProduct(id, user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Enable or disable a product' })
  toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('isAvailable') isAvailable: boolean,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.toggleStatus(id, isAvailable, user.id);
  }
}
