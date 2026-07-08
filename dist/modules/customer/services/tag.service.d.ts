import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
export declare class TagService {
    private prisma;
    constructor(prisma: PrismaService);
    createTag(dto: CreateCustomerTagDto): Promise<{
        name: string;
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        colorHex: string | null;
    }>;
    getAllTags(): Promise<{
        name: string;
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        colorHex: string | null;
    }[]>;
    assignTagToCustomer(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    removeTagFromCustomer(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
}
