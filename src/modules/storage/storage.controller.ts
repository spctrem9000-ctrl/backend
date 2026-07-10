import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StorageService } from './services/storage.service';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Storage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/single')
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'folder', required: true, example: 'products' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({
            fileType: /(image\/(png|jpeg|jpg|webp))|(audio\/(mpeg|wav|ogg|mp3))/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    if (!folder) throw new BadRequestException('Folder is required');
    // Sanitize folder path
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    return this.storageService.uploadSingle(file, sanitizedFolder);
  }

  @Post('upload/multiple')
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'folder', required: true, example: 'products' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultiple(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB per file
          new FileTypeValidator({
            fileType: /(image\/(png|jpeg|jpg|webp))|(audio\/(mpeg|wav|ogg|mp3))/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Query('folder') folder: string,
  ) {
    if (!folder) throw new BadRequestException('Folder is required');
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    return this.storageService.uploadMultiple(files, sanitizedFolder);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a file' })
  @ApiQuery({ name: 'url', required: true })
  async deleteFile(@Query('url') url: string) {
    if (!url) throw new BadRequestException('URL is required');
    await this.storageService.delete(url);
    return { message: 'File deleted' };
  }
}
