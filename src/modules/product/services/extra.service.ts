import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateExtraGroupDto } from '../dto/create-extra-group.dto';
import { UpdateExtraGroupDto } from '../dto/update-extra-group.dto';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';

@Injectable()
export class ExtraService {
  constructor(private prisma: PrismaService) {}

  // =====================================
  // EXTRA GROUPS
  // =====================================

  async createGroup(dto: CreateExtraGroupDto, adminId: string) {
    return this.prisma.extraGroup.create({
      data: {
        ...dto,
        createdBy: adminId,
      },
    });
  }

  async updateGroup(id: number, dto: UpdateExtraGroupDto, _adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extraGroup.update({
      where: { id },
      data: dto,
    });
  }

  async deleteGroup(id: number, _adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extraGroup.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async getGroups(includeDeleted = false) {
    return this.prisma.extraGroup.findMany({
      where: includeDeleted ? undefined : { isDeleted: false },
      include: {
        extras: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // =====================================
  // EXTRAS
  // =====================================

  async createExtra(groupId: number, dto: CreateExtraDto, adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extra.create({
      data: {
        ...dto,
        extraGroupId: groupId,
        createdBy: adminId,
      },
    });
  }

  async updateExtra(id: number, dto: UpdateExtraDto, _adminId: string) {
    const extra = await this.prisma.extra.findUnique({ where: { id } });
    if (!extra) throw new NotFoundException('Extra not found');

    return this.prisma.extra.update({
      where: { id },
      data: dto,
    });
  }

  async deleteExtra(id: number, _adminId: string) {
    const extra = await this.prisma.extra.findUnique({ where: { id } });
    if (!extra) throw new NotFoundException('Extra not found');

    return this.prisma.extra.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  // =====================================
  // PRODUCT LINKS
  // =====================================

  async linkGroupToProduct(productId: number, groupId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const group = await this.prisma.extraGroup.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.productExtraGroup.upsert({
      where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
      update: {},
      create: { productId, extraGroupId: groupId },
    });
  }

  async unlinkGroupFromProduct(productId: number, groupId: number) {
    return this.prisma.productExtraGroup
      .delete({
        where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
      })
      .catch(() => null);
  }
}
