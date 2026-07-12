import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Pass custom Prisma configuration here if needed (e.g. logging)
    super({
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    // Soft Delete Middleware
    this.$use(async (params, next) => {
      // List of models that have the `isDeleted` field
      const softDeleteModels = [
        'Admin',
        'FeatureFlag',
        'Setting',
        'Customer',
        'Address',
        'CustomerNote',
        'CustomerTag',
        'Category',
        'Product',
        'ExtraGroup',
        'Extra',
        'Order',
      ];

      if (softDeleteModels.includes(params.model || '')) {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst';
          params.args.where = { ...params.args.where, isDeleted: false };
        }
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.isDeleted == undefined) {
              params.args.where.isDeleted = false;
            }
          } else {
            params.args.where = { isDeleted: false };
          }
        }
        if (params.action === 'count') {
          if (params.args.where) {
            if (params.args.where.isDeleted == undefined) {
              params.args.where.isDeleted = false;
            }
          } else {
            params.args.where = { isDeleted: false };
          }
        }
        // Instead of hard deleting, update isDeleted to true
        if (params.action === 'delete') {
          params.action = 'update';
          params.args.data = { isDeleted: true };
        }
        if (params.action === 'deleteMany') {
          params.action = 'updateMany';
          if (params.args.data !== undefined) {
            params.args.data.isDeleted = true;
          } else {
            params.args.data = { isDeleted: true };
          }
        }
      }
      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
