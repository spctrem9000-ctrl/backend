import { CustomerService } from './customer.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getProfile(user: {
        id: number;
    }): Promise<{
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
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
    }>;
    updateProfile(user: {
        id: number;
    }, updateDto: UpdateProfileDto): Promise<{
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
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
    }>;
    deleteAccount(user: {
        id: number;
    }): Promise<{
        message: string;
    }>;
}
