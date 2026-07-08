import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { validate } from './core/config/env.validation';
import { PrismaModule } from './core/prisma/prisma.module';
import { HealthModule } from './core/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CategoryModule } from './modules/category/category.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

import { StorageModule } from './modules/storage/storage.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { LoyaltyModule } from './modules/loyalty/loyalty.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { EngagementModule } from './modules/engagement/engagement.module';
import { CmsModule } from './modules/cms/cms.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Core Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    // Core Modules
    PrismaModule,
    HealthModule,

    // Feature Modules
    CustomerModule,
    AuthModule,
    CategoryModule,
    StorageModule,
    ProductModule,
    CartModule,
    OrderModule,
    LoyaltyModule,
    MarketingModule,
    EngagementModule,
    CmsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
