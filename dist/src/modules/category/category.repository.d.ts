import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';
export declare class CategoryRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    findById(id: number, includeDeleted?: boolean): Promise<Category | null>;
    findByName(nameAr: string, nameEn: string): Promise<Category | null>;
    findByDisplayOrder(displayOrder: number): Promise<Category | null>;
    findAllActive(): Promise<Category[]>;
    findAllFeatured(): Promise<Category[]>;
    search(query: string): Promise<Category[]>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    shiftDisplayOrders(startOrder: number): Promise<void>;
}
