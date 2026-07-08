import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutDto } from '../dto/checkout.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Orders & Checkout')
@Controller('customer/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerOrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly checkoutService: CheckoutService,
  ) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Create an order from cart' })
  checkout(@CurrentUser() user: { id: number }, @Body() dto: CheckoutDto) {
    return this.checkoutService.checkout(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get order history' })
  getOrders(@CurrentUser() user: { id: number }) {
    return this.orderService.getCustomerOrders(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details and tracking' })
  getOrderDetails(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.orderService.getCustomerOrderDetails(user.id, id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel order (only if Pending)' })
  cancelOrder(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.orderService.cancelOrderCustomer(user.id, id);
  }
}
