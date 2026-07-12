import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AdminCreateInput): Promise<{
        id: number;
        guid: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        guid: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        guid: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    } | null>;
}
