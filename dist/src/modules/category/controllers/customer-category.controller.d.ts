import { CategoryService } from '../category.service';
export declare class CustomerCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getActiveCategories(): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        categoryCode: string;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        isFeatured: boolean;
        createdBy: string | null;
        updatedBy: string | null;
    }[]>;
    getFeaturedCategories(): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        categoryCode: string;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        isFeatured: boolean;
        createdBy: string | null;
        updatedBy: string | null;
    }[]>;
}
