import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { OrderFilterDto } from '../dto/order-filter.dto';
import { UpdateOrderStatusDto } from '../dto/order-status.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Admin Orders')
@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Search and filter orders' })
  getOrders(@Query() filters: OrderFilterDto) {
    return this.orderService.getOrders(filters);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get full order details, history, and activity log',
  })
  getOrderDetails(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getAdminOrderDetails(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change order status' })
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.orderService.changeOrderStatus(id, dto.status, user.id);
  }
}
