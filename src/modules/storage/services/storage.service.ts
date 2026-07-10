import { Inject, Injectable, Logger } from '@nestjs/common';
import { STORAGE_PROVIDER_TOKEN } from '../storage.factory';
import type { IStorageProvider } from '../interfaces/storage-provider.interface';
import { ImageProcessorService } from './image-processor.service';

export interface StorageUrls {
  originalUrl: string;
  mediumUrl: string;
  thumbnailUrl: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @Inject(STORAGE_PROVIDER_TOKEN)
    private readonly storageProvider: IStorageProvider,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  async uploadSingle(
    file: Express.Multer.File,
    folder: string,
  ): Promise<StorageUrls> {
    const isAudio = file.mimetype.startsWith('audio/');

    if (isAudio) {
      // Upload audio directly without any image processing
      const ext = file.originalname.split('.').pop() || 'mp3';
      const { v4: uuidv4 } = await import('uuid');
      const filename = `${uuidv4()}.${ext}`;
      const url = await this.storageProvider.uploadFile(
        file.buffer,
        filename,
        folder,
        file.mimetype,
      );
      this.logger.log(`Audio file uploaded to folder ${folder}: ${filename}`);
      // Return same URL for all three to keep interface consistent
      return { originalUrl: url, mediumUrl: url, thumbnailUrl: url };
    }

    const { original, medium, thumbnail, filename } =
      await this.imageProcessor.processImage(file.buffer);
    const mimeType = 'image/webp';

    const [originalUrl, mediumUrl, thumbnailUrl] = await Promise.all([
      this.storageProvider.uploadFile(
        original,
        `original_${filename}`,
        folder,
        mimeType,
      ),
      this.storageProvider.uploadFile(
        medium,
        `medium_${filename}`,
        folder,
        mimeType,
      ),
      this.storageProvider.uploadFile(
        thumbnail,
        `thumb_${filename}`,
        folder,
        mimeType,
      ),
    ]);

    this.logger.log(
      `File uploaded successfully to folder ${folder}: ${filename}`,
    );

    return { originalUrl, mediumUrl, thumbnailUrl };
  }

  async uploadMultiple(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<StorageUrls[]> {
    return Promise.all(files.map((file) => this.uploadSingle(file, folder)));
  }

  async delete(url: string): Promise<void> {
    await this.storageProvider.deleteFile(url);
    this.logger.log(`File deleted: ${url}`);
  }
}
