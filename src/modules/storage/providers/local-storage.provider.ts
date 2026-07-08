import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
  private readonly logger = new Logger(LocalStorageProvider.name);
  private readonly uploadsDir = path.join(process.cwd(), 'uploads');
  private readonly publicUrl: string;

  constructor(private configService: ConfigService) {
    this.publicUrl =
      this.configService.get<string>('LOCAL_PUBLIC_URL') ||
      'http://localhost:3000/uploads';
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
  ): Promise<string> {
    try {
      const folderPath = path.join(this.uploadsDir, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filePath = path.join(folderPath, filename);
      await fs.promises.writeFile(filePath, file);

      // Return public URL
      return `${this.publicUrl}/${folder}/${filename}`;
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `Failed to save file locally: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Local storage upload failed');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract relative path from URL
      const urlObj = new URL(fileUrl);
      // Ensure the path starts with /uploads/ and extract everything after
      const relativePath = urlObj.pathname.replace(/^\/uploads\//, '');
      const filePath = path.join(this.uploadsDir, relativePath);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        this.logger.log(`Deleted local file: ${filePath}`);
      }
    } catch (err) {
      const error = err as Error;
      this.logger.error(
        `Failed to delete local file ${fileUrl}: ${error.message}`,
        error.stack,
      );
      // Soft fail, don't break the app if file is already gone
    }
  }
}
