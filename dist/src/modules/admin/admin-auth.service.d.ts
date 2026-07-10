import { OnModuleInit } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminAuthService implements OnModuleInit {
    private adminRepository;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(adminRepository: AdminRepository, jwtService: JwtService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    login(dto: AdminLoginDto): Promise<{
        profile: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            name: string;
            email: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    private generateTokens;
}
