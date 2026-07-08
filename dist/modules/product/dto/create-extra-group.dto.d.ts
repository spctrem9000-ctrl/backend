import { SelectionType } from '@prisma/client';
export declare class CreateExtraGroupDto {
    nameAr: string;
    nameEn: string;
    selectionType?: SelectionType;
    isRequired?: boolean;
    minSelection?: number;
    maxSelection?: number;
    sortOrder?: number;
    isAvailable?: boolean;
}
