import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async getAdminBanners() {
    return this.prisma.banner.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getActiveBanners() {
    const now = new Date();
    return this.prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async createBanner(data: any) {
    const count = await this.prisma.banner.count();
    return this.prisma.banner.create({
      data: {
        ...data,
        sortOrder: count,
      },
    });
  }

  async updateBanner(id: number, data: any) {
    return this.prisma.banner.update({
      where: { id },
      data,
    });
  }

  async deleteBanner(id: number) {
    return this.prisma.banner.delete({
      where: { id },
    });
  }

  async reorderBanners(orderedIds: number[]) {
    const updates = orderedIds.map((id, index) =>
      this.prisma.banner.update({
        where: { id },
        data: { sortOrder: index },
      }),
    );
    return this.prisma.$transaction(updates);
  }
}
