import { AdminProfileService } from './admin-profile.service';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/admin-profile.dto';
export declare class AdminProfileController {
    private readonly profileService;
    constructor(profileService: AdminProfileService);
    getProfile(user: {
        id: string;
    }): Promise<{
        name: string;
        guid: string;
        email: string;
        createdAt: Date;
    }>;
    updateProfile(user: {
        id: string;
    }, dto: UpdateProfileDto): Promise<{
        name: string;
        guid: string;
        email: string;
    }>;
    changePassword(user: {
        id: string;
    }, dto: UpdatePasswordDto): Promise<{
        success: boolean;
    }>;
}
