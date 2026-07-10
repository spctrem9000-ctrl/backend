import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        profile: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            name: string;
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        profile: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            updatedBy: string | null;
            isDeleted: boolean;
            name: string;
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
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshTokens(user: any): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(user: any): Promise<{
        message: string;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
}
