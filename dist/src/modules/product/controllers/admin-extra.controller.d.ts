import { ExtraService } from '../services/extra.service';
import { CreateExtraGroupDto } from '../dto/create-extra-group.dto';
import { UpdateExtraGroupDto } from '../dto/update-extra-group.dto';
import { CreateExtraDto } from '../dto/create-extra.dto';
import { UpdateExtraDto } from '../dto/update-extra.dto';
export declare class AdminExtraController {
    private readonly extraService;
    constructor(extraService: ExtraService);
    createGroup(dto: CreateExtraGroupDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        selectionType: import(".prisma/client").$Enums.SelectionType;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
    getGroups(): Promise<({
        extras: {
            id: number;
            guid: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            nameAr: string;
            nameEn: string;
            createdBy: string | null;
            sortOrder: number;
            isAvailable: boolean;
            imageUrl: string | null;
            extraGroupId: number;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        selectionType: import(".prisma/client").$Enums.SelectionType;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    })[]>;
    updateGroup(id: number, dto: UpdateExtraGroupDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        selectionType: import(".prisma/client").$Enums.SelectionType;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
    deleteGroup(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        selectionType: import(".prisma/client").$Enums.SelectionType;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
    createExtra(groupId: number, dto: CreateExtraDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        imageUrl: string | null;
        extraGroupId: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateExtra(id: number, dto: UpdateExtraDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        imageUrl: string | null;
        extraGroupId: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    deleteExtra(id: number, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        nameAr: string;
        nameEn: string;
        createdBy: string | null;
        sortOrder: number;
        isAvailable: boolean;
        imageUrl: string | null;
        extraGroupId: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    linkGroupToProduct(productId: number, groupId: number): Promise<{
        createdAt: Date;
        productId: number;
        extraGroupId: number;
    }>;
    unlinkGroupFromProduct(productId: number, groupId: number): Promise<{
        createdAt: Date;
        productId: number;
        extraGroupId: number;
    } | null>;
}
