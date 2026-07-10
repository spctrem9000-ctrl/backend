import { PrismaService } from '../../core/prisma/prisma.service';
export declare class AdminProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(adminId: string): Promise<{
        name: string;
        guid: string;
        email: string;
        createdAt: Date;
    }>;
    updateProfile(adminId: string, name: string, email: string): Promise<{
        name: string;
        guid: string;
        email: string;
    }>;
    updatePassword(adminId: string, oldPassword: string, newPassword: string): Promise<{
        success: boolean;
    }>;
}
