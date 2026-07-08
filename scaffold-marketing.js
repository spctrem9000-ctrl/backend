const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ----------------------
// Loyalty Module
// ----------------------
const loyaltyDir = 'D:/Menu/backend/src/modules/loyalty';
ensureDir(loyaltyDir);
ensureDir(path.join(loyaltyDir, 'controllers'));
ensureDir(path.join(loyaltyDir, 'services'));
ensureDir(path.join(loyaltyDir, 'dto'));

fs.writeFileSync(path.join(loyaltyDir, 'loyalty.module.ts'), `import { Module } from '@nestjs/common';
import { LoyaltyService } from './services/loyalty.service';
import { AdminLoyaltyController } from './controllers/admin-loyalty.controller';
import { CustomerLoyaltyController } from './controllers/customer-loyalty.controller';

@Module({
  controllers: [AdminLoyaltyController, CustomerLoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
`);

fs.writeFileSync(path.join(loyaltyDir, 'services', 'loyalty.service.ts'), `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async getBalance(customerId: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw new NotFoundException('Customer not found');
    return { points: customer.loyaltyPoints };
  }

  async getHistory(customerId: number) {
    return this.prisma.loyaltyTransaction.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Internal method to add points after successful order
  async earnPoints(customerId: number, points: number, orderId?: number) {
    await this.prisma.$transaction([
      this.prisma.loyaltyTransaction.create({
        data: { customerId, points, type: 'EARN', orderId }
      }),
      this.prisma.customer.update({
        where: { id: customerId },
        data: { loyaltyPoints: { increment: points } }
      })
    ]);
  }

  // Internal method to deduct points
  async redeemPoints(customerId: number, points: number, orderId?: number) {
    await this.prisma.$transaction([
      this.prisma.loyaltyTransaction.create({
        data: { customerId, points: -points, type: 'REDEEM', orderId }
      }),
      this.prisma.customer.update({
        where: { id: customerId },
        data: { loyaltyPoints: { decrement: points } }
      })
    ]);
  }
}
`);

fs.writeFileSync(path.join(loyaltyDir, 'controllers', 'customer-loyalty.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoyaltyService } from '../services/loyalty.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Loyalty')
@Controller('customer/loyalty')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerLoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get current point balance' })
  getBalance(@CurrentUser() user: { id: number }) {
    return this.loyaltyService.getBalance(user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get transaction history' })
  getHistory(@CurrentUser() user: { id: number }) {
    return this.loyaltyService.getHistory(user.id);
  }
}
`);

fs.writeFileSync(path.join(loyaltyDir, 'controllers', 'admin-loyalty.controller.ts'), `import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoyaltyService } from '../services/loyalty.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Loyalty')
@Controller('admin/loyalty')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminLoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Get(':customerId/history')
  @ApiOperation({ summary: 'Get customer transaction history' })
  getHistory(@Param('customerId', ParseIntPipe) id: number) {
    return this.loyaltyService.getHistory(id);
  }
}
`);

// ----------------------
// Marketing Module (Coupons & Banners)
// ----------------------
const marketingDir = 'D:/Menu/backend/src/modules/marketing';
ensureDir(marketingDir);
ensureDir(path.join(marketingDir, 'controllers'));
ensureDir(path.join(marketingDir, 'services'));

fs.writeFileSync(path.join(marketingDir, 'marketing.module.ts'), `import { Module } from '@nestjs/common';
import { CouponService } from './services/coupon.service';
import { BannerService } from './services/banner.service';
import { AdminCouponController } from './controllers/admin-coupon.controller';
import { AdminBannerController } from './controllers/admin-banner.controller';
import { CustomerBannerController } from './controllers/customer-banner.controller';

@Module({
  controllers: [AdminCouponController, AdminBannerController, CustomerBannerController],
  providers: [CouponService, BannerService],
  exports: [CouponService],
})
export class MarketingModule {}
`);

fs.writeFileSync(path.join(marketingDir, 'services', 'coupon.service.ts'), `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async getAdminCoupons() {
    return this.prisma.coupon.findMany({
      include: {
        targetProducts: { include: { product: true } },
        targetCategories: { include: { category: true } },
      }
    });
  }
}
`);

fs.writeFileSync(path.join(marketingDir, 'services', 'banner.service.ts'), `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async getActiveBanners() {
    return this.prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
  }
}
`);

fs.writeFileSync(path.join(marketingDir, 'controllers', 'admin-coupon.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CouponService } from '../services/coupon.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Coupons')
@Controller('admin/coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminCouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  @ApiOperation({ summary: 'Get all coupons' })
  getCoupons() {
    return this.couponService.getAdminCoupons();
  }
}
`);

fs.writeFileSync(path.join(marketingDir, 'controllers', 'admin-banner.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BannerService } from '../services/banner.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Banners')
@Controller('admin/banners')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminBannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banners' })
  getBanners() {
    return this.bannerService.getActiveBanners();
  }
}
`);

fs.writeFileSync(path.join(marketingDir, 'controllers', 'customer-banner.controller.ts'), `import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BannerService } from '../services/banner.service';

@ApiTags('Customer Banners')
@Controller('customer/banners')
export class CustomerBannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiOperation({ summary: 'Get active banners' })
  getBanners() {
    return this.bannerService.getActiveBanners();
  }
}
`);

// ----------------------
// Engagement Module (Notifications)
// ----------------------
const engagementDir = 'D:/Menu/backend/src/modules/engagement';
ensureDir(engagementDir);
ensureDir(path.join(engagementDir, 'controllers'));
ensureDir(path.join(engagementDir, 'services'));

fs.writeFileSync(path.join(engagementDir, 'engagement.module.ts'), `import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { AdminNotificationController } from './controllers/admin-notification.controller';
import { CustomerNotificationController } from './controllers/customer-notification.controller';

@Module({
  controllers: [AdminNotificationController, CustomerNotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class EngagementModule {}
`);

fs.writeFileSync(path.join(engagementDir, 'services', 'notification.service.ts'), `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getCustomerNotifications(customerId: number) {
    return this.prisma.notification.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
`);

fs.writeFileSync(path.join(engagementDir, 'controllers', 'customer-notification.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Customer Notifications')
@Controller('customer/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
@ApiBearerAuth()
export class CustomerNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get my notifications' })
  getNotifications(@CurrentUser() user: { id: number }) {
    return this.notificationService.getCustomerNotifications(user.id);
  }
}
`);

fs.writeFileSync(path.join(engagementDir, 'controllers', 'admin-notification.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Notifications')
@Controller('admin/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Stub for admin endpoints
}
`);

// ----------------------
// CMS Module (Home Builder)
// ----------------------
const cmsDir = 'D:/Menu/backend/src/modules/cms';
ensureDir(cmsDir);
ensureDir(path.join(cmsDir, 'controllers'));
ensureDir(path.join(cmsDir, 'services'));

fs.writeFileSync(path.join(cmsDir, 'cms.module.ts'), `import { Module } from '@nestjs/common';
import { HomeBuilderService } from './services/home-builder.service';
import { AdminHomeController } from './controllers/admin-home.controller';
import { CustomerHomeController } from './controllers/customer-home.controller';

@Module({
  controllers: [AdminHomeController, CustomerHomeController],
  providers: [HomeBuilderService],
  exports: [HomeBuilderService],
})
export class CmsModule {}
`);

fs.writeFileSync(path.join(cmsDir, 'services', 'home-builder.service.ts'), `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class HomeBuilderService {
  constructor(private prisma: PrismaService) {}

  async getHomeLayout() {
    return this.prisma.homeSection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        customProducts: { include: { product: true } }
      }
    });
  }
}
`);

fs.writeFileSync(path.join(cmsDir, 'controllers', 'customer-home.controller.ts'), `import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HomeBuilderService } from '../services/home-builder.service';

@ApiTags('Customer Home')
@Controller('customer/home')
export class CustomerHomeController {
  constructor(private readonly homeBuilderService: HomeBuilderService) {}

  @Get()
  @ApiOperation({ summary: 'Get dynamic home layout' })
  getLayout() {
    return this.homeBuilderService.getHomeLayout();
  }
}
`);

fs.writeFileSync(path.join(cmsDir, 'controllers', 'admin-home.controller.ts'), `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HomeBuilderService } from '../services/home-builder.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Home Builder')
@Controller('admin/home')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminHomeController {
  constructor(private readonly homeBuilderService: HomeBuilderService) {}

  @Get()
  @ApiOperation({ summary: 'Get home layout sections' })
  getLayout() {
    return this.homeBuilderService.getHomeLayout();
  }
}
`);

// Add Modules to app.module.ts
const appModule = 'D:/Menu/backend/src/app.module.ts';
let am = fs.readFileSync(appModule, 'utf8');
am = am.replace(/import { OrderModule } from '.\/modules\/order\/order.module';/, "import { OrderModule } from './modules/order/order.module';\nimport { LoyaltyModule } from './modules/loyalty/loyalty.module';\nimport { MarketingModule } from './modules/marketing/marketing.module';\nimport { EngagementModule } from './modules/engagement/engagement.module';\nimport { CmsModule } from './modules/cms/cms.module';");
am = am.replace(/OrderModule,/, "OrderModule,\n    LoyaltyModule,\n    MarketingModule,\n    EngagementModule,\n    CmsModule,");
fs.writeFileSync(appModule, am);

console.log('Marketing, Loyalty, Engagement, and CMS Modules generated successfully.');
