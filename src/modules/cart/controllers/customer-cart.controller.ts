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
import { CartService } from '../services/cart.service';
import {
  AddCartItemDto,
  UpdateCartItemQuantityDto,
  ApplyCouponDto,
} from '../dto/cart.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Cart')
@Controller('customer/cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerCartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current cart' })
  getCart(@CurrentUser() user: { id: number }) {
    return this.cartService.getCart(user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  addItem(@CurrentUser() user: { id: number }, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(user.id, dto);
  }

  @Put('items/:itemId/quantity')
  @ApiOperation({ summary: 'Update item quantity' })
  updateQuantity(
    @CurrentUser() user: { id: number },
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemQuantityDto,
  ) {
    return this.cartService.updateQuantity(user.id, itemId, dto.quantity);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(
    @CurrentUser() user: { id: number },
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  clearCart(@CurrentUser() user: { id: number }) {
    return this.cartService.clearCart(user.id);
  }

  @Post('coupon')
  @ApiOperation({ summary: 'Apply coupon' })
  applyCoupon(
    @CurrentUser() user: { id: number },
    @Body() dto: ApplyCouponDto,
  ) {
    return this.cartService.applyCoupon(user.id, dto.code);
  }

  @Delete('coupon')
  @ApiOperation({ summary: 'Remove coupon' })
  removeCoupon(@CurrentUser() user: { id: number }) {
    return this.cartService.removeCoupon(user.id);
  }
}
