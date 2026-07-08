const fs = require('fs');
const path = require('path');

const svcDir = 'D:/Menu/backend/src/modules/product/services';
const ctrlDir = 'D:/Menu/backend/src/modules/product/controllers';

fs.writeFileSync(path.join(svcDir, 'extra.service.ts'), `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateExtraGroupDto } from '../dto/create-extra-group.dto';
import { UpdateExtraGroupDto } from '../dto/update-extra-group.dto';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';

@Injectable()
export class ExtraService {
  constructor(private prisma: PrismaService) {}

  // =====================================
  // EXTRA GROUPS
  // =====================================

  async createGroup(dto: CreateExtraGroupDto, adminId: string) {
    return this.prisma.extraGroup.create({
      data: {
        ...dto,
        createdBy: adminId,
      },
    });
  }

  async updateGroup(id: number, dto: UpdateExtraGroupDto, _adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extraGroup.update({
      where: { id },
      data: dto,
    });
  }

  async deleteGroup(id: number, _adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extraGroup.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async getGroups(includeDeleted = false) {
    return this.prisma.extraGroup.findMany({
      where: includeDeleted ? undefined : { isDeleted: false },
      include: { extras: { where: { isDeleted: false }, orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // =====================================
  // EXTRAS
  // =====================================

  async createExtra(groupId: number, dto: CreateExtraDto, adminId: string) {
    const group = await this.prisma.extraGroup.findUnique({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.extra.create({
      data: {
        ...dto,
        extraGroupId: groupId,
        createdBy: adminId,
      },
    });
  }

  async updateExtra(id: number, dto: UpdateExtraDto, _adminId: string) {
    const extra = await this.prisma.extra.findUnique({ where: { id } });
    if (!extra) throw new NotFoundException('Extra not found');

    return this.prisma.extra.update({
      where: { id },
      data: dto,
    });
  }

  async deleteExtra(id: number, _adminId: string) {
    const extra = await this.prisma.extra.findUnique({ where: { id } });
    if (!extra) throw new NotFoundException('Extra not found');

    return this.prisma.extra.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  // =====================================
  // PRODUCT LINKS
  // =====================================

  async linkGroupToProduct(productId: number, groupId: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    
    const group = await this.prisma.extraGroup.findUnique({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Extra Group not found');

    return this.prisma.productExtraGroup.upsert({
      where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
      update: {},
      create: { productId, extraGroupId: groupId },
    });
  }

  async unlinkGroupFromProduct(productId: number, groupId: number) {
    return this.prisma.productExtraGroup.delete({
      where: { productId_extraGroupId: { productId, extraGroupId: groupId } },
    }).catch(() => null);
  }
}
`);

fs.writeFileSync(path.join(ctrlDir, 'admin-extra.controller.ts'), `import { Controller, Post, Body, Patch, Param, Delete, Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExtraService } from '../services/extra.service';
import { CreateExtraGroupDto } from '../dto/create-extra-group.dto';
import { UpdateExtraGroupDto } from '../dto/update-extra-group.dto';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Admin Extras')
@Controller('admin/extras')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@ApiBearerAuth()
export class AdminExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post('groups')
  @ApiOperation({ summary: 'Create new Extra Group' })
  createGroup(@Body() dto: CreateExtraGroupDto, @CurrentUser() user: { id: string }) {
    return this.extraService.createGroup(dto, user.id);
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get all Extra Groups' })
  getGroups() {
    return this.extraService.getGroups(true);
  }

  @Patch('groups/:id')
  @ApiOperation({ summary: 'Update Extra Group' })
  updateGroup(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateExtraGroupDto, @CurrentUser() user: { id: string }) {
    return this.extraService.updateGroup(id, dto, user.id);
  }

  @Delete('groups/:id')
  @ApiOperation({ summary: 'Delete Extra Group' })
  deleteGroup(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: string }) {
    return this.extraService.deleteGroup(id, user.id);
  }

  @Post('groups/:groupId/items')
  @ApiOperation({ summary: 'Add Extra to Group' })
  createExtra(@Param('groupId', ParseIntPipe) groupId: number, @Body() dto: CreateExtraDto, @CurrentUser() user: { id: string }) {
    return this.extraService.createExtra(groupId, dto, user.id);
  }

  @Patch('items/:id')
  @ApiOperation({ summary: 'Update Extra' })
  updateExtra(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateExtraDto, @CurrentUser() user: { id: string }) {
    return this.extraService.updateExtra(id, dto, user.id);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Delete Extra' })
  deleteExtra(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: string }) {
    return this.extraService.deleteExtra(id, user.id);
  }

  @Post('products/:productId/groups/:groupId')
  @ApiOperation({ summary: 'Link Extra Group to Product' })
  linkGroupToProduct(@Param('productId', ParseIntPipe) productId: number, @Param('groupId', ParseIntPipe) groupId: number) {
    return this.extraService.linkGroupToProduct(productId, groupId);
  }

  @Delete('products/:productId/groups/:groupId')
  @ApiOperation({ summary: 'Unlink Extra Group from Product' })
  unlinkGroupFromProduct(@Param('productId', ParseIntPipe) productId: number, @Param('groupId', ParseIntPipe) groupId: number) {
    return this.extraService.unlinkGroupFromProduct(productId, groupId);
  }
}
`);

fs.writeFileSync(path.join(ctrlDir, 'admin-gallery.controller.ts'), `import { Controller, Post, Put, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
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
    if (!files || files.length === 0) throw new BadRequestException('No files uploaded');

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!product) throw new NotFoundException('Product not found');

    if (product.images.length + files.length > 5) {
      throw new BadRequestException('A product can have a maximum of 5 gallery images');
    }

    const uploadedImages = [];
    let currentMaxSort = product.images.length > 0 ? Math.max(...product.images.map(img => img.sortOrder)) : 0;

    for (const file of files) {
      const url = await this.storageService.uploadFile(file, 'products');
      currentMaxSort += 1;
      const newImage = await this.prisma.productImage.create({
        data: {
          productId,
          imageUrl: url,
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
    if (!image) throw new NotFoundException('Image not found in this product gallery');

    await this.prisma.productImage.delete({ where: { id: imageId } });
    
    // Attempt physical deletion silently
    const filename = image.imageUrl.split('/').pop();
    if (filename) {
      await this.storageService.deleteFile('products', filename).catch(() => null);
    }

    return { message: 'Image deleted' };
  }

  @Put('reorder')
  @ApiOperation({ summary: 'Reorder Product Gallery images' })
  async reorderGallery(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: ReorderGalleryDto,
  ) {
    const updates = dto.items.map(item =>
      this.prisma.productImage.updateMany({
        where: { id: item.imageId, productId },
        data: { sortOrder: item.sortOrder },
      })
    );
    await this.prisma.$transaction(updates);
    return { message: 'Gallery reordered successfully' };
  }
}
`);

console.log('Services and Controllers scaffolded.');
