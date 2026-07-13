import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Logger, Injectable } from '@nestjs/common';
import { RealtimeService } from './realtime.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly realtimeService: RealtimeService,
  ) {}

  afterInit(server: Server) {
    this.realtimeService.setServer(server);
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const token = this.extractTokenFromHeader(client);
      if (!token) {
        this.logger.warn(`Connection rejected (No token): ${client.id}`);
        client.disconnect(true);
        return;
      }

      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // Join standard rooms based on role
      if (payload.role === 'admin') {
        client.join('admin');
        this.logger.log(`Admin connected: ${payload.sub} (Socket: ${client.id})`);
      } else if (payload.role === 'customer') {
        client.join(`customer:${payload.sub}`);
        this.logger.log(`Customer connected: ${payload.sub} (Socket: ${client.id})`);
      } else {
        this.logger.warn(`Unknown role connected: ${payload.role}`);
      }

    } catch (e) {
      this.logger.warn(`Connection rejected (Invalid token): ${client.id}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    // 1. Try socket.io auth object
    if (client.handshake.auth && client.handshake.auth.token) {
      const token = client.handshake.auth.token as string;
      return token.startsWith('Bearer ') ? token.slice(7) : token;
    }
    // 2. Try regular headers
    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return undefined;
  }
}
