import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { UpdateDisplayOrderDto } from '../dto/update-display-order.dto';
export declare class AdminCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    search(query: string): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    update(id: number, dto: UpdateCategoryDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    remove(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    restore(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    changeOrder(id: number, dto: UpdateDisplayOrderDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    enable(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
    disable(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
    }>;
}
