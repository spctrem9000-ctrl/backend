import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Product, ActivityAction } from '@prisma/client';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: { images: true, insight: true },
    });
  }

  async findById(id: number, includeDeleted = false) {
    return this.prisma.product.findFirst({
      where: { id, ...(includeDeleted ? {} : { isDeleted: false }) },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        insight: true,
        priceHistory: { orderBy: { createdAt: 'desc' }, take: 5 },
        extraGroups: {
          include: {
            extraGroup: {
              include: {
                extras: {
                  where: { isDeleted: false },
                  orderBy: { sortOrder: 'asc' },
                },
              },
            },
          },
        },
      },
    });
  }

  async findByCode(productCode: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { productCode, isDeleted: false },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { images: true, insight: true },
    });
  }

  async findAll(filters: ProductFilterDto, isAdmin = false) {
    const where: Prisma.ProductWhereInput = {
      isDeleted: false,
    };

    if (!isAdmin) {
      where.isAvailable = true;
    }

    if (filters.search) {
      where.OR = [
        { nameAr: { contains: filters.search, mode: 'insensitive' } },
        { nameEn: { contains: filters.search, mode: 'insensitive' } },
        { descriptionAr: { contains: filters.search, mode: 'insensitive' } },
        { descriptionEn: { contains: filters.search, mode: 'insensitive' } },
        { productCode: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.isAvailable !== undefined)
      where.isAvailable = filters.isAvailable;
    if (filters.isBestSeller !== undefined)
      where.isBestSeller = filters.isBestSeller;
    if (filters.isOffer !== undefined) where.isOffer = filters.isOffer;
    if (filters.isNew !== undefined) where.isNew = filters.isNew;
    if (filters.isFeatured !== undefined) where.isFeatured = filters.isFeatured;

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.basePrice = {};
      if (filters.minPrice !== undefined)
        where.basePrice.gte = filters.minPrice;
      if (filters.maxPrice !== undefined)
        where.basePrice.lte = filters.maxPrice;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { sortOrder: 'asc' };

    switch (filters.sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'price_asc':
        orderBy = { basePrice: 'asc' };
        break;
      case 'price_desc':
        orderBy = { basePrice: 'desc' };
        break;
      case 'alphabetical':
        orderBy = { nameEn: 'asc' };
        break;
      case 'manual':
        orderBy = { sortOrder: 'asc' };
        break;
    }

    return this.prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: { select: { id: true, nameAr: true, nameEn: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        insight: true,
      },
    });
  }

  // Transaction Helpers

  async logActivity(
    productId: number,
    action: ActivityAction,
    adminId: string,
    details?: any,
  ) {
    return this.prisma.productActivityLog.create({
      data: {
        productId,
        action,
        adminId,
        details: details ? (details as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });
  }

  async recordPriceChange(
    productId: number,
    oldPrice: number,
    newPrice: number,
    adminId: string,
    reason?: string,
  ) {
    return this.prisma.productPriceHistory.create({
      data: {
        productId,
        oldPrice,
        newPrice,
        changedBy: adminId,
        reason,
      },
    });
  }
}
