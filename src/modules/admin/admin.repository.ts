import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput) {
    return this.prisma.admin.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.admin.findUnique({
      where: { id },
    });
  }
}
