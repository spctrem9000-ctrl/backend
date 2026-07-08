import { CategoryService } from '../category.service';
export declare class CustomerCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getActiveCategories(): Promise<{
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
    getFeaturedCategories(): Promise<{
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
}
