import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AdminCreateInput): Promise<{
        name: string;
        id: number;
        guid: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        password: string;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        id: number;
        guid: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        password: string;
    } | null>;
    findById(id: number): Promise<{
        name: string;
        id: number;
        guid: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        password: string;
    } | null>;
}
