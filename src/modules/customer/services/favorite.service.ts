import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(customerId: number, productId: number) {
    const existing = await this.prisma.favoriteProduct.findUnique({
      where: { customerId_productId: { customerId, productId } },
    });

    if (existing) {
      await this.prisma.favoriteProduct.delete({
        where: { customerId_productId: { customerId, productId } },
      });
      return { message: 'Removed from favorites', isFavorite: false };
    }

    // Verify product exists and is not deleted
    const product = await this.prisma.product.findUnique({
      where: { id: productId, isDeleted: false },
    });
    if (!product) throw new NotFoundException('Product not found');

    await this.prisma.favoriteProduct.create({
      data: { customerId, productId },
    });
    return { message: 'Added to favorites', isFavorite: true };
  }

  async getFavorites(customerId: number) {
    const favorites = await this.prisma.favoriteProduct.findMany({
      where: { customerId },
      include: {
        product: true,
      },
    });
    // Return only products
    return favorites.map((f) => f.product);
  }
}
