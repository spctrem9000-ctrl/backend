import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { AdminCategoryController } from './controllers/admin-category.controller';
import { CustomerCategoryController } from './controllers/customer-category.controller';

@Module({
  controllers: [AdminCategoryController, CustomerCategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
