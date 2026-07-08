import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { IStorageProvider } from '../interfaces/storage-provider.interface';

@Injectable()
export class R2StorageProvider implements IStorageProvider {
  private readonly logger = new Logger(R2StorageProvider.name);
  private s3Client: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKey = this.configService.get<string>('R2_ACCESS_KEY');
    const secretKey = this.configService.get<string>('R2_SECRET_KEY');
    this.bucket = this.configService.get<string>('R2_BUCKET') || '';
    this.publicUrl = this.configService.get<string>('R2_PUBLIC_URL') || '';

    // Custom endpoint if provided, else construct Cloudflare R2 endpoint
    const endpoint =
      this.configService.get<string>('R2_ENDPOINT') ||
      `https://${accountId}.r2.cloudflarestorage.com`;

    if (!accountId || !accessKey || !secretKey || !this.bucket) {
      this.logger.warn(
        'R2 configuration is incomplete. Storage module may fail if R2 driver is active.',
      );
    } else {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: endpoint,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        },
      });
    }
  }

  async uploadFile(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string,
  ): Promise<string> {
    try {
      const key = `${folder}/${filename}`;
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);

      return `${this.publicUrl}/${key}`;
    } catch (err) {
      const error = err as Error;
      this.logger.error(`R2 Upload Error: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Cloud storage upload failed');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      if (!fileUrl.startsWith(this.publicUrl)) return;

      const key = fileUrl.replace(`${this.publicUrl}/`, '');
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`Deleted R2 file: ${key}`);
    } catch (err) {
      const error = err as Error;
      this.logger.error(`R2 Delete Error: ${error.message}`, error.stack);
    }
  }
}
