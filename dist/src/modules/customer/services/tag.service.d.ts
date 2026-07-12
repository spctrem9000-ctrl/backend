import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
export declare class TagService {
    private prisma;
    constructor(prisma: PrismaService);
    createTag(dto: CreateCustomerTagDto): Promise<{
        id: number;
        guid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        colorHex: string | null;
    }>;
    getAllTags(): Promise<{
        id: number;
        guid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        colorHex: string | null;
    }[]>;
    assignTagToCustomer(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    removeTagFromCustomer(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
}
