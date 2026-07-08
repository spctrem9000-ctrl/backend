import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: number, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.clearDefault(customerId);
    }
    return this.prisma.address.create({
      data: { ...dto, customerId },
    });
  }

  async findAll(customerId: number) {
    return this.prisma.address.findMany({
      where: { customerId, isDeleted: false },
      orderBy: { isDefault: 'desc' },
    });
  }

  async update(id: number, customerId: number, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findFirst({
      where: { id, customerId, isDeleted: false },
    });
    if (!address) throw new NotFoundException('Address not found');

    if (dto.isDefault) {
      await this.clearDefault(customerId);
    }
    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, customerId: number) {
    const address = await this.prisma.address.findFirst({
      where: { id, customerId, isDeleted: false },
    });
    if (!address) throw new NotFoundException('Address not found');

    return this.prisma.address.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async setDefault(id: number, customerId: number) {
    const address = await this.prisma.address.findFirst({
      where: { id, customerId, isDeleted: false },
    });
    if (!address) throw new NotFoundException('Address not found');

    await this.clearDefault(customerId);
    return this.prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });
  }

  private async clearDefault(customerId: number) {
    await this.prisma.address.updateMany({
      where: { customerId, isDefault: true, isDeleted: false },
      data: { isDefault: false },
    });
  }
}
