import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AdminAuthService implements OnModuleInit {
  private readonly logger = new Logger(AdminAuthService.name);

  constructor(
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Seed default admin
    const defaultEmail = 'admin@divado.com';
    const existingAdmin = await this.adminRepository.findByEmail(defaultEmail);

    if (!existingAdmin) {
      this.logger.log('Seeding default admin user...');
      const passwordHash = await bcrypt.hash('12345678', 10);
      await this.adminRepository.create({
        email: defaultEmail,
        name: 'Super Admin',
        password: passwordHash,
      });
      this.logger.log('Default admin user created successfully.');
    }
  }

  async login(dto: AdminLoginDto) {
    const admin = await this.adminRepository.findByEmail(dto.email);
    if (!admin || admin.isDeleted) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const tokens = await this.generateTokens(admin.guid, admin.email, 'ADMIN');

    const { password: _password, ...profile } = admin;
    return { profile, tokens };
  }

  private async generateTokens(
    userId: string | number,
    email: string,
    role: string,
  ) {
    const payload = { sub: userId, email, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
