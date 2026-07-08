import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CustomerCartController } from './controllers/customer-cart.controller';

@Module({
  controllers: [CustomerCartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
