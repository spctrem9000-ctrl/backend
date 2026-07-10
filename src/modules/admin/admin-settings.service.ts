import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSettings() {
    const settings = await this.prisma.setting.findMany({
      where: { isDeleted: false },
    });
    return {
      success: true,
      data: settings,
    };
  }

  async getSetting(key: string) {
    const setting = await this.prisma.setting.findFirst({
      where: { key, isDeleted: false },
    });
    if (!setting) {
      throw new NotFoundException(`Setting with key ${key} not found`);
    }
    return {
      success: true,
      data: setting,
    };
  }

  async updateSetting(key: string, value: any) {
    const existing = await this.prisma.setting.findFirst({
      where: { key, isDeleted: false },
    });

    let setting;
    if (existing) {
      setting = await this.prisma.setting.update({
        where: { id: existing.id },
        data: { value },
      });
    } else {
      setting = await this.prisma.setting.create({
        data: { key, value },
      });
    }

    return {
      success: true,
      data: setting,
    };
  }
}
