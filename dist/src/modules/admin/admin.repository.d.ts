import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AdminCreateInput): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        name: string;
        email: string;
        password: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        name: string;
        email: string;
        password: string;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        name: string;
        email: string;
        password: string;
    } | null>;
}
