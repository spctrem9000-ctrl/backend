import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto, adminId: string) {
    await this.validateUniqueName(dto.nameAr, dto.nameEn);
    await this.handleDisplayOrderCollision(dto.displayOrder);

    const categoryCode = `CAT-${randomBytes(3).toString('hex').toUpperCase()}`;

    return this.categoryRepository.create({
      ...dto,
      categoryCode,
      createdBy: adminId,
    });
  }

  async update(id: number, dto: UpdateCategoryDto, adminId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    if (dto.nameAr || dto.nameEn) {
      await this.validateUniqueName(
        dto.nameAr || category.nameAr,
        dto.nameEn || category.nameEn,
        id,
      );
    }

    if (dto.displayOrder && dto.displayOrder !== category.displayOrder) {
      await this.handleDisplayOrderCollision(dto.displayOrder);
    }

    return this.categoryRepository.update(id, {
      ...dto,
      updatedBy: adminId,
    });
  }

  async delete(id: number, adminId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    const count = (category as any)?._count?.products || 0;
    if (category && count > 0) {
      throw new BadRequestException(
        'Cannot delete a category containing products',
      );
    }

    return this.categoryRepository.update(id, {
      isDeleted: true,
      updatedBy: adminId,
    });
  }

  async restore(id: number, adminId: string) {
    const category = await this.categoryRepository.findById(id, true);
    if (!category) throw new NotFoundException('Category not found');
    if (!category.isDeleted)
      throw new BadRequestException('Category is not deleted');

    return this.categoryRepository.update(id, {
      isDeleted: false,
      updatedBy: adminId,
    });
  }

  async getDetails(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async searchCategories(query: string) {
    if (!query) return [];
    return this.categoryRepository.search(query);
  }

  async toggleActive(id: number, isActive: boolean, adminId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepository.update(id, { isActive, updatedBy: adminId });
  }

  async changeDisplayOrder(id: number, newOrder: number, adminId: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    if (category.displayOrder === newOrder) return category;

    await this.handleDisplayOrderCollision(newOrder);
    return this.categoryRepository.update(id, {
      displayOrder: newOrder,
      updatedBy: adminId,
    });
  }

  async getActiveCategories() {
    return this.categoryRepository.findAllActive();
  }

  async getFeaturedCategories() {
    return this.categoryRepository.findAllFeatured();
  }

  // --- Private Helpers ---

  private async validateUniqueName(
    nameAr: string,
    nameEn: string,
    excludeId?: number,
  ) {
    const existing = await this.categoryRepository.findByName(nameAr, nameEn);
    if (existing && existing.id !== excludeId) {
      throw new BadRequestException(
        'Category name (Arabic or English) already exists',
      );
    }
  }

  private async handleDisplayOrderCollision(order: number) {
    const existing = await this.categoryRepository.findByDisplayOrder(order);
    if (existing) {
      // Shift all display orders from this point downwards by 1
      await this.categoryRepository.shiftDisplayOrders(order);
    }
  }
}
