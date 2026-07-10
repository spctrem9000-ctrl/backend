import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('CustomerApp-Products')
@Controller('products')
export class CustomerProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'List and filter active products' })
  findAll(@Query() filters: ProductFilterDto) {
    return this.productService.searchCustomer(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details (and increment views)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getCustomerDetails(id);
  }
}
