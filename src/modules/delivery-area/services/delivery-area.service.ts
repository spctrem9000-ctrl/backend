import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateDeliveryAreaDto, UpdateDeliveryAreaDto } from '../dto/delivery-area.dto';

@Injectable()
export class DeliveryAreaService {
  constructor(private prisma: PrismaService) {}

  async findAllAdmin() {
    return this.prisma.deliveryArea.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllActive() {
    return this.prisma.deliveryArea.findMany({
      where: { isDeleted: false, isActive: true },
      orderBy: { nameEn: 'asc' },
    });
  }

  async findOne(id: number) {
    const area = await this.prisma.deliveryArea.findFirst({
      where: { id, isDeleted: false },
    });
    if (!area) throw new NotFoundException('Delivery area not found');
    return area;
  }

  async create(dto: CreateDeliveryAreaDto) {
    return this.prisma.deliveryArea.create({
      data: dto,
    });
  }

  async update(id: number, dto: UpdateDeliveryAreaDto) {
    await this.findOne(id); // verify exists
    return this.prisma.deliveryArea.update({
      where: { id },
      data: dto,
    });
  }

  async softDelete(id: number) {
    await this.findOne(id);
    return this.prisma.deliveryArea.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }
}
