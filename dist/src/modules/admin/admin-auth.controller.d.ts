import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(dto: AdminLoginDto): Promise<{
        profile: {
            id: number;
            guid: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
}
