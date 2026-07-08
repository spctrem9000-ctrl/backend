import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../product.repository';
import { ProductHistoryService } from './product-history.service';
import { ProductInsightService } from './product-insight.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { ActivityAction } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly historyService: ProductHistoryService,
    private readonly insightService: ProductInsightService,
  ) {}

  async create(dto: CreateProductDto, adminId: string) {
    if (dto.discountPrice !== undefined && dto.discountPrice >= dto.basePrice) {
      throw new BadRequestException(
        'Discount price must be strictly less than the base price',
      );
    }
    if (dto.galleryImages && dto.galleryImages.length > 5) {
      throw new BadRequestException(
        'A product can have a maximum of 5 gallery images',
      );
    }

    const productCode = `PRD-${randomBytes(4).toString('hex').toUpperCase()}`;

    const product = await this.productRepository.create({
      productCode,
      nameAr: dto.nameAr,
      nameEn: dto.nameEn,
      descriptionAr: dto.descriptionAr,
      descriptionEn: dto.descriptionEn,
      mainImage: dto.mainImage,
      basePrice: dto.basePrice,
      discountPrice: dto.discountPrice,
      preparationTime: dto.preparationTime,
      calories: dto.calories,
      sortOrder: dto.sortOrder,
      isAvailable: dto.isAvailable,
      isFeatured: dto.isFeatured,
      isBestSeller: dto.isBestSeller,
      isNew: dto.isNew,
      isOffer: dto.isOffer,
      category: { connect: { id: dto.categoryId } },
      images: dto.galleryImages
        ? {
            create: dto.galleryImages.map((img) => ({
              imageUrl: img.imageUrl,
              sortOrder: img.sortOrder || 0,
            })),
          }
        : undefined,
      insight: {
        create: { views: 0 },
      },
      createdBy: adminId,
    });

    await this.historyService.logAction(
      product.id,
      ActivityAction.CREATE,
      adminId,
    );
    return product;
  }

  async update(id: number, dto: UpdateProductDto, adminId: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const newBase =
      dto.basePrice !== undefined ? dto.basePrice : Number(product.basePrice);
    const newDiscount =
      dto.discountPrice !== undefined
        ? dto.discountPrice
        : product.discountPrice
          ? Number(product.discountPrice)
          : undefined;

    if (newDiscount !== undefined && newDiscount >= newBase) {
      throw new BadRequestException(
        'Discount price must be less than base price',
      );
    }

    // Handle Image Replacement
    let imagesUpdate;
    if (dto.galleryImages) {
      if (dto.galleryImages.length > 5)
        throw new BadRequestException('Max 5 gallery images');
      imagesUpdate = {
        deleteMany: {}, // Clear old
        create: dto.galleryImages.map((img) => ({
          imageUrl: img.imageUrl,
          sortOrder: img.sortOrder || 0,
        })),
      };
    }

    const updated = await this.productRepository.update(id, {
      nameAr: dto.nameAr,
      nameEn: dto.nameEn,
      descriptionAr: dto.descriptionAr,
      descriptionEn: dto.descriptionEn,
      mainImage: dto.mainImage,
      basePrice: dto.basePrice,
      discountPrice: dto.discountPrice,
      preparationTime: dto.preparationTime,
      calories: dto.calories,
      sortOrder: dto.sortOrder,
      isAvailable: dto.isAvailable,
      isFeatured: dto.isFeatured,
      isBestSeller: dto.isBestSeller,
      isNew: dto.isNew,
      isOffer: dto.isOffer,
      category: dto.categoryId
        ? { connect: { id: dto.categoryId } }
        : undefined,
      images: imagesUpdate,
      updatedBy: adminId,
    });

    // Check Price Changes
    if (
      dto.basePrice !== undefined &&
      Number(dto.basePrice) !== Number(product.basePrice)
    ) {
      await this.historyService.recordPriceChange(
        id,
        Number(product.basePrice),
        Number(dto.basePrice),
        adminId,
        'Base price updated',
      );
    }

    // Check Image Changes
    if (dto.mainImage !== undefined && dto.mainImage !== product.mainImage) {
      await this.historyService.logAction(
        id,
        ActivityAction.IMAGE_CHANGE,
        adminId,
        {
          type: 'mainImage',
          old: product.mainImage,
          new: dto.mainImage,
        },
      );
    }

    // Check Status Changes
    if (
      dto.isAvailable !== undefined &&
      dto.isAvailable !== product.isAvailable
    ) {
      await this.historyService.logAction(
        id,
        ActivityAction.STATUS_CHANGE,
        adminId,
        { field: 'isAvailable', val: dto.isAvailable },
      );
    }

    await this.historyService.logAction(id, ActivityAction.UPDATE, adminId);
    return updated;
  }

  async delete(id: number, adminId: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const deleted = await this.productRepository.update(id, {
      isDeleted: true,
      updatedBy: adminId,
    });
    await this.historyService.logAction(id, ActivityAction.DELETE, adminId);
    return deleted;
  }

  async restore(id: number, adminId: string) {
    const product = await this.productRepository.findById(id, true);
    if (!product) throw new NotFoundException('Product not found');
    if (!product.isDeleted)
      throw new BadRequestException('Product is not deleted');

    const restored = await this.productRepository.update(id, {
      isDeleted: false,
      updatedBy: adminId,
    });
    await this.historyService.logAction(id, ActivityAction.RESTORE, adminId);
    return restored;
  }

  async duplicateProduct(id: number, adminId: string) {
    const original = (await this.productRepository.findById(id, true)) as any;
    if (!original) throw new NotFoundException('Product not found');

    const newCode = `PRD-${randomBytes(4).toString('hex').toUpperCase()}`;
    const duplicatedNameAr = original.nameAr + ' - Copy';
    const duplicatedNameEn = original.nameEn + ' - Copy';

    // Disconnect properties not to be duplicated exactly or that need unique constraints
    const duplicated = await this.productRepository.create({
      productCode: newCode,
      nameAr: duplicatedNameAr,
      nameEn: duplicatedNameEn,
      descriptionAr: original.descriptionAr,
      descriptionEn: original.descriptionEn,
      mainImage: original.mainImage,
      basePrice: original.basePrice,
      discountPrice: original.discountPrice,
      preparationTime: original.preparationTime,
      calories: original.calories,
      sortOrder: original.sortOrder,
      isAvailable: false, // Default duplicates to false
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      isOffer: original.isOffer,
      category: { connect: { id: original.categoryId } },
      insight: { create: { views: 0 } },
      images:
        original.images && original.images.length > 0
          ? {
              create: original.images.map((img: any) => ({
                imageUrl: img.imageUrl,
                sortOrder: img.sortOrder,
              })),
            }
          : undefined,
      createdBy: adminId,
    });

    await this.historyService.logAction(
      duplicated.id,
      ActivityAction.CREATE,
      adminId,
      { note: `Duplicated from PRD #${id}` },
    );
    return duplicated;
  }

  async toggleStatus(id: number, isAvailable: boolean, adminId: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    const updated = await this.productRepository.update(id, {
      isAvailable,
      updatedBy: adminId,
    });

    await this.historyService.logAction(
      id,
      ActivityAction.STATUS_CHANGE,
      adminId,
      { field: 'isAvailable', val: isAvailable },
    );
    return updated;
  }

  async getAdminDetails(id: number) {
    const product = await this.productRepository.findById(id, true);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getCustomerDetails(id: number) {
    const product = await this.productRepository.findById(id, false);
    if (!product || !product.isAvailable)
      throw new NotFoundException('Product not found');

    // Async telemetry
    await this.insightService.incrementViews(id);

    return product;
  }

  async searchAdmin(filters: ProductFilterDto) {
    return this.productRepository.findAll(filters, true);
  }

  async searchCustomer(filters: ProductFilterDto) {
    return this.productRepository.findAll(filters, false);
  }
}
