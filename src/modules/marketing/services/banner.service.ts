import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  private mapBanner(banner: any) {
    const { targetId, ...rest } = banner;
    return {
      ...rest,
      targetUrl: targetId,
    };
  }

  async getAdminBanners() {
    const banners = await this.prisma.banner.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return banners.map((b) => this.mapBanner(b));
  }

  async getActiveBanners() {
    const now = new Date();
    const banners = await this.prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
      orderBy: { sortOrder: 'asc' },
    });
    return banners.map((b) => this.mapBanner(b));
  }

  async createBanner(data: any) {
    const count = await this.prisma.banner.count();
    
    if (data.targetUrl !== undefined) {
      data.targetId = data.targetUrl;
      delete data.targetUrl;
    }

    const banner = await this.prisma.banner.create({
      data: {
        ...data,
        sortOrder: count,
      },
    });
    return this.mapBanner(banner);
  }

  async updateBanner(id: number, data: any) {
    if (data.targetUrl !== undefined) {
      data.targetId = data.targetUrl;
      delete data.targetUrl;
    }

    const banner = await this.prisma.banner.update({
      where: { id },
      data,
    });
    return this.mapBanner(banner);
  }

  async deleteBanner(id: number) {
    const banner = await this.prisma.banner.delete({
      where: { id },
    });
    return this.mapBanner(banner);
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
