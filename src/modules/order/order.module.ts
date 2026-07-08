import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { CheckoutService } from './services/checkout.service';
import { OrderNotificationService } from './services/order-notification.service';
import { CustomerOrderController } from './controllers/customer-order.controller';
import { AdminOrderController } from './controllers/admin-order.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [CustomerOrderController, AdminOrderController],
  providers: [OrderService, CheckoutService, OrderNotificationService],
  exports: [OrderService, CheckoutService],
})
export class OrderModule {}
