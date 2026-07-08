import { PrismaService } from '../../../core/prisma/prisma.service';
import { StorageService } from '../../storage/services/storage.service';
import { ReorderGalleryDto } from '../dto/gallery.dto';
export declare class AdminGalleryController {
    private readonly prisma;
    private readonly storageService;
    constructor(prisma: PrismaService, storageService: StorageService);
    uploadImages(productId: number, files: Express.Multer.File[]): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        sortOrder: number;
        imageUrl: string;
    }[]>;
    deleteImage(productId: number, imageId: number): Promise<{
        message: string;
    }>;
    reorderGallery(productId: number, dto: ReorderGalleryDto): Promise<{
        message: string;
    }>;
}
