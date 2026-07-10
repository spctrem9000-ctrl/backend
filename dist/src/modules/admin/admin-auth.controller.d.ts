import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
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
}
