import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminRepository } from './admin.repository';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminProfileController } from './admin-profile.controller';
import { AdminProfileService } from './admin-profile.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AdminAuthController, AdminDashboardController, AdminProfileController],
  providers: [AdminAuthService, AdminRepository, AdminDashboardService, AdminProfileService],
  exports: [AdminAuthService, AdminRepository, AdminDashboardService, AdminProfileService],
})
export class AdminModule {}
