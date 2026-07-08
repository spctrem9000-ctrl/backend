import {
  Controller,
  Post,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { StorageService } from '../../storage/services/storage.service';
import { ReorderGalleryDto } from '../dto/gallery.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Admin Product Gallery')
@Controller('admin/products/:productId/gallery')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminGalleryController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Upload images to Product Gallery (Max 5 total)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadImages(
    @Param('productId', ParseIntPipe) productId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0)
      throw new BadRequestException('No files uploaded');

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('Product not found');

    if (product.images.length + files.length > 5) {
      throw new BadRequestException(
        'A product can have a maximum of 5 gallery images',
      );
    }

    const uploadedImages = [];
    let currentMaxSort =
      product.images.length > 0
        ? Math.max(...product.images.map((img) => img.sortOrder))
        : 0;

    for (const file of files) {
      const url = await this.storageService.uploadSingle(file, 'products');
      currentMaxSort += 1;
      const newImage = await this.prisma.productImage.create({
        data: {
          productId,
          imageUrl: url.originalUrl,
          sortOrder: currentMaxSort,
        },
      });
      uploadedImages.push(newImage);
    }

    return uploadedImages;
  }

  @Delete(':imageId')
  @ApiOperation({ summary: 'Delete an image from Product Gallery' })
  async deleteImage(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ) {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image)
      throw new NotFoundException('Image not found in this product gallery');

    await this.prisma.productImage.delete({ where: { id: imageId } });

    // Attempt physical deletion silently
    await this.storageService.delete(image.imageUrl).catch(() => null);

    return { message: 'Image deleted' };
  }

  @Put('reorder')
  @ApiOperation({ summary: 'Reorder Product Gallery images' })
  async reorderGallery(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: ReorderGalleryDto,
  ) {
    const updates = dto.items.map((item) =>
      this.prisma.productImage.updateMany({
        where: { id: item.imageId, productId },
        data: { sortOrder: item.sortOrder },
      }),
    );
    await this.prisma.$transaction(updates);
    return { message: 'Gallery reordered successfully' };
  }
}
