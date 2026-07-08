import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './services/storage.service';
import { ImageProcessorService } from './services/image-processor.service';
import { storageFactory } from './storage.factory';

@Module({
  controllers: [StorageController],
  providers: [StorageService, ImageProcessorService, storageFactory],
  exports: [StorageService],
})
export class StorageModule {}
