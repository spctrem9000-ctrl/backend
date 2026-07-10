import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class HomeBuilderService {
  constructor(private prisma: PrismaService) {}

  async getAdminLayout() {
    return this.prisma.homeSection.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        customProducts: {
          orderBy: { sortOrder: 'asc' },
          include: {
            product: {
              select: { id: true, nameEn: true, nameAr: true, mainImage: true },
            },
          },
        },
      },
    });
  }

  async getHomeLayout() {
    return this.prisma.homeSection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        customProducts: {
          orderBy: { sortOrder: 'asc' },
          include: { product: true },
        },
      },
    });
  }

  async createSection(data: any) {
    const count = await this.prisma.homeSection.count();
    const { productIds, ...rest } = data;
    return this.prisma.homeSection.create({
      data: {
        ...rest,
        sortOrder: count,
        customProducts: productIds?.length
          ? {
              create: productIds.map((id: number, idx: number) => ({
                productId: id,
                sortOrder: idx,
              })),
            }
          : undefined,
      },
    });
  }

  async updateSection(id: number, data: any) {
    const { productIds, ...rest } = data;
    if (productIds !== undefined) {
      await this.prisma.homeSectionProduct.deleteMany({
        where: { homeSectionId: id },
      });
    }
    return this.prisma.homeSection.update({
      where: { id },
      data: {
        ...rest,
        customProducts: productIds?.length
          ? {
              create: productIds.map((pid: number, idx: number) => ({
                productId: pid,
                sortOrder: idx,
              })),
            }
          : undefined,
      },
    });
  }

  async deleteSection(id: number) {
    return this.prisma.homeSection.delete({ where: { id } });
  }

  async reorderSections(orderedIds: number[]) {
    const updates = orderedIds.map((id, index) =>
      this.prisma.homeSection.update({
        where: { id },
        data: { sortOrder: index },
      }),
    );
    return this.prisma.$transaction(updates);
  }
}
