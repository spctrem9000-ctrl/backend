import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageProcessorService {
  private readonly logger = new Logger(ImageProcessorService.name);

  async processImage(buffer: Buffer): Promise<{
    original: Buffer;
    medium: Buffer;
    thumbnail: Buffer;
    filename: string;
  }> {
    try {
      const filename = `${uuidv4()}.webp`; // Random unique name to prevent traversal

      // Original WebP compression
      const original = await sharp(buffer).webp({ quality: 80 }).toBuffer();

      // Medium 600px width
      const medium = await sharp(buffer)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      // Thumbnail 150px width
      const thumbnail = await sharp(buffer)
        .resize({ width: 150, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      return { original, medium, thumbnail, filename };
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `Image processing failed: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Image processing failed');
    }
  }
}
