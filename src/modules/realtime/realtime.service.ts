import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class RealtimeService {
  private server: Server;
  private readonly logger = new Logger(RealtimeService.name);

  setServer(server: Server) {
    this.server = server;
  }

  emitOrderCreated(order: any) {
    if (!this.server) return;
    this.server.to('admin').emit('new_order', order);
    this.logger.log(`Emitted new_order to admin room for order #${order.id}`);
  }

  emitOrderStatusChanged(orderId: number, status: string, customerId: number) {
    if (!this.server) return;
    
    const payload = { orderId, status };
    
    // Notify customer
    this.server.to(`customer:${customerId}`).emit('order_updated', payload);
    // Notify admin
    this.server.to('admin').emit('order_updated', payload);
    
    this.logger.log(`Emitted order_updated for order #${orderId}`);
  }

  emitLoyaltyPointsUpdated(customerId: number, points: number) {
    if (!this.server) return;
    this.server.to(`customer:${customerId}`).emit('loyalty_updated', { points });
  }

  emitCustomerRegistered(customer: any) {
    if (!this.server) return;
    this.server.to('admin').emit('customer_registered', customer);
  }
}
