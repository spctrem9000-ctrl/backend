import { CustomerRepository } from './customer.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class CustomerService {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepository);
    getProfile(customerId: number): Promise<{
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
    getAllCustomers(): Promise<{
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
    }[]>;
    updateProfile(customerId: number, updateDto: UpdateProfileDto): Promise<{
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
    softDeleteAccount(customerId: number): Promise<{
        message: string;
    }>;
}
