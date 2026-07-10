import { CategoryService } from '../category.service';
export declare class CustomerCategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getActiveCategories(): Promise<{
        id: number;
        guid: string;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        isActive: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
    }[]>;
    getFeaturedCategories(): Promise<{
        id: number;
        guid: string;
        nameAr: string;
        nameEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        isFeatured: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        isDeleted: boolean;
        isActive: boolean;
        categoryCode: string;
        image: string | null;
        displayOrder: number;
    }[]>;
}
