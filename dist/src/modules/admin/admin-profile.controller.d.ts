import { AdminProfileService } from './admin-profile.service';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/admin-profile.dto';
export declare class AdminProfileController {
    private readonly profileService;
    constructor(profileService: AdminProfileService);
    getProfile(user: {
        id: string;
    }): Promise<{
        guid: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    updateProfile(user: {
        id: string;
    }, dto: UpdateProfileDto): Promise<{
        guid: string;
        email: string;
        name: string;
    }>;
    changePassword(user: {
        id: string;
    }, dto: UpdatePasswordDto): Promise<{
        success: boolean;
    }>;
}
