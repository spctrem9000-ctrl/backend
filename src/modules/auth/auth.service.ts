import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from '../customer/customer.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerRepository: CustomerRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.customerRepository.findByPhone(
      registerDto.phone,
    );
    if (existing) {
      throw new BadRequestException('Phone number is already registered');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const customer = await this.customerRepository.create({
      phone: registerDto.phone,
      passwordHash,
      name: registerDto.name,
      email: registerDto.email,
      status: 'UNVERIFIED',
    });

    const tokens = await this.generateTokens(
      customer.id,
      customer.phone,
      'CUSTOMER',
    );
    await this.updateRefreshToken(customer.id, tokens.refreshToken);

    const { ...profile } = customer;
    return { profile, tokens };
  }

  async login(loginDto: LoginDto) {
    const customer = await this.customerRepository.findByPhone(loginDto.phone);
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      loginDto.password,
      customer.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (customer.status === 'BLOCKED') {
      throw new UnauthorizedException('Account is blocked');
    }

    const tokens = await this.generateTokens(
      customer.id,
      customer.phone,
      'CUSTOMER',
    );
    await this.updateRefreshToken(customer.id, tokens.refreshToken);

    const { ...profile } = customer;
    return { profile, tokens };
  }

  async logout(userId: number) {
    await this.customerRepository.update(userId, { hashedRefreshToken: null });
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const customer = await this.customerRepository.findById(userId);
    if (!customer || !customer.hashedRefreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      customer.hashedRefreshToken,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.generateTokens(
      customer.id,
      customer.phone,
      'CUSTOMER',
    );
    await this.updateRefreshToken(customer.id, tokens.refreshToken);
    return { tokens };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const customer = await this.customerRepository.findById(userId);
    if (!customer) {
      throw new UnauthorizedException('Customer not found');
    }

    const isMatch = await bcrypt.compare(
      dto.oldPassword,
      customer.passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.customerRepository.update(userId, { passwordHash });
    return { message: 'Password changed successfully' };
  }

  async forgotPassword(dto: any) {
    // Await added for async keyword
    await Promise.resolve();
    // In a real application, this would send an SMS OTP.
    // For this scope, we just return a success message assuming OTP flow is handled elsewhere or later.
    return { message: 'Password reset instructions sent to ' + dto.phone };
  }

  private async generateTokens(userId: number, phone: string, role: string) {
    const payload = { sub: userId, phone, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.customerRepository.update(userId, { hashedRefreshToken });
  }
}
