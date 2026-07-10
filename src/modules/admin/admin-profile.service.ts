import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { guid: adminId },
      select: { guid: true, name: true, email: true, createdAt: true },
    });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async updateProfile(adminId: string, name: string, email: string) {
    return this.prisma.admin.update({
      where: { guid: adminId },
      data: { name, email },
      select: { guid: true, name: true, email: true },
    });
  }

  async updatePassword(adminId: string, oldPassword: string, newPassword: string) {
    const admin = await this.prisma.admin.findUnique({ where: { guid: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const isValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isValid) throw new BadRequestException('Incorrect old password');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.admin.update({
      where: { guid: adminId },
      data: { password: hashed },
    });

    return { success: true };
  }
}
