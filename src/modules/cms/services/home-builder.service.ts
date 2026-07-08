import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class HomeBuilderService {
  constructor(private prisma: PrismaService) {}

  async getHomeLayout() {
    return this.prisma.homeSection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        customProducts: { include: { product: true } },
      },
    });
  }
}
