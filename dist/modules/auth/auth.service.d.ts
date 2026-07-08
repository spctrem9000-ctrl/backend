import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '../customer/customer.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthService {
    private customerRepository;
    private jwtService;
    private configService;
    constructor(customerRepository: CustomerRepository, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        profile: {
            name: string;
            id: number;
            guid: string;
            phone: string;
            passwordHash: string;
            email: string | null;
            status: import(".prisma/client").$Enums.CustomerStatus;
            loyaltyPoints: number;
            hashedRefreshToken: string | null;
            profileImageUrl: string | null;
            totalOrders: number;
            completedOrders: number;
            cancelledOrders: number;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            lastOrderDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        profile: {
            name: string;
            id: number;
            guid: string;
            phone: string;
            passwordHash: string;
            email: string | null;
            status: import(".prisma/client").$Enums.CustomerStatus;
            loyaltyPoints: number;
            hashedRefreshToken: string | null;
            profileImageUrl: string | null;
            totalOrders: number;
            completedOrders: number;
            cancelledOrders: number;
            totalSpent: import("@prisma/client/runtime/library").Decimal;
            lastOrderDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: any): Promise<{
        message: string;
    }>;
    private generateTokens;
    private updateRefreshToken;
}
