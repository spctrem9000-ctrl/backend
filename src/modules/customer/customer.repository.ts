import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma, Customer } from '@prisma/client';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { phone, isDeleted: false },
    });
  }

  async findById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async update(
    id: number,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }
}
