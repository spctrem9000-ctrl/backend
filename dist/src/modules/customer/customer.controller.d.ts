import { CustomerService } from './customer.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getProfile(user: {
        id: number;
    }): Promise<{
        id: number;
        guid: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
    }>;
    updateProfile(user: {
        id: number;
    }, updateDto: UpdateProfileDto): Promise<{
        id: number;
        guid: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
    }>;
    deleteAccount(user: {
        id: number;
    }): Promise<{
        message: string;
    }>;
}
