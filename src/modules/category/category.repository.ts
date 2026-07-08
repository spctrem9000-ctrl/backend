import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async findById(id: number, includeDeleted = false): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: { _count: { select: { products: true } } },
    });
  }

  async findByName(nameAr: string, nameEn: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        OR: [{ nameAr }, { nameEn }],
        isDeleted: false,
      },
    });
  }

  async findByDisplayOrder(displayOrder: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { displayOrder, isDeleted: false },
    });
  }

  async findAllActive(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { isActive: true, isDeleted: false },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findAllFeatured(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { isFeatured: true, isActive: true, isDeleted: false },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async search(query: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        isDeleted: false,
        OR: [
          { nameAr: { contains: query, mode: 'insensitive' } },
          { nameEn: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async shiftDisplayOrders(startOrder: number): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE "Category" 
      SET "displayOrder" = "displayOrder" + 1 
      WHERE "displayOrder" >= ${startOrder} AND "isDeleted" = false
    `;
  }
}
