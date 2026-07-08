import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(dto: CreateCustomerTagDto) {
    return this.prisma.customerTag.create({ data: dto });
  }

  async getAllTags() {
    return this.prisma.customerTag.findMany({ where: { isDeleted: false } });
  }

  async assignTagToCustomer(customerId: number, tagId: number) {
    // Ensure both exist
    const tag = await this.prisma.customerTag.findUnique({
      where: { id: tagId, isDeleted: false },
    });
    if (!tag) throw new NotFoundException('Tag not found');

    const mapping = await this.prisma.customerTagMapping.findUnique({
      where: { customerId_tagId: { customerId, tagId } },
    });

    if (!mapping) {
      await this.prisma.customerTagMapping.create({
        data: { customerId, tagId },
      });
    }
    return { message: 'Tag assigned' };
  }

  async removeTagFromCustomer(customerId: number, tagId: number) {
    await this.prisma.customerTagMapping.delete({
      where: { customerId_tagId: { customerId, tagId } },
    });
    return { message: 'Tag removed' };
  }
}
