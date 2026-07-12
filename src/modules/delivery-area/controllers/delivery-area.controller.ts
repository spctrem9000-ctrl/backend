import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeliveryAreaService } from '../services/delivery-area.service';
import { CreateDeliveryAreaDto, UpdateDeliveryAreaDto } from '../dto/delivery-area.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Delivery Areas (Admin)')
@Controller('admin/delivery-areas')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminDeliveryAreaController {
  constructor(private readonly deliveryAreaService: DeliveryAreaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new delivery area' })
  create(@Body() dto: CreateDeliveryAreaDto) {
    return this.deliveryAreaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all delivery areas (including inactive)' })
  findAll() {
    return this.deliveryAreaService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single delivery area' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryAreaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a delivery area' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDeliveryAreaDto) {
    return this.deliveryAreaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a delivery area' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryAreaService.softDelete(id);
  }
}

@ApiTags('Delivery Areas (Customer)')
@Controller('customer/delivery-areas')
export class CustomerDeliveryAreaController {
  constructor(private readonly deliveryAreaService: DeliveryAreaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active delivery areas' })
  findAll() {
    return this.deliveryAreaService.findAllActive();
  }
}
