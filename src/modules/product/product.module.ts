import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductHistoryService } from './services/product-history.service';
import { ProductInsightService } from './services/product-insight.service';
import { ProductService } from './services/product.service';
import { AdminProductController } from './controllers/admin-product.controller';
import { CustomerProductController } from './controllers/customer-product.controller';
import { AdminExtraController } from './controllers/admin-extra.controller';
import { AdminGalleryController } from './controllers/admin-gallery.controller';
import { ExtraService } from './services/extra.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [
    AdminProductController,
    CustomerProductController,
    AdminExtraController,
    AdminGalleryController,
  ],
  providers: [
    ProductRepository,
    ProductHistoryService,
    ProductInsightService,
    ProductService,
    ExtraService,
  ],
  exports: [ProductService, ProductInsightService],
})
export class ProductModule {}
