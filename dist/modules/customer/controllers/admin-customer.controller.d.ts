import { TagService } from '../services/tag.service';
import { NoteService } from '../services/note.service';
import { CustomerService } from '../customer.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';
export declare class AdminCustomerController {
    private readonly tagService;
    private readonly noteService;
    private readonly customerService;
    constructor(tagService: TagService, noteService: NoteService, customerService: CustomerService);
    getAllCustomers(): Promise<{
        name: string;
        id: number;
        guid: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.CustomerStatus;
        loyaltyPoints: number;
        profileImageUrl: string | null;
        totalOrders: number;
        completedOrders: number;
        cancelledOrders: number;
        totalSpent: import("@prisma/client/runtime/library").Decimal;
        lastOrderDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
    }[]>;
    createTag(dto: CreateCustomerTagDto): Promise<{
        name: string;
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        colorHex: string | null;
    }>;
    getAllTags(): Promise<{
        name: string;
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        colorHex: string | null;
    }[]>;
    assignTag(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    removeTag(customerId: number, tagId: number): Promise<{
        message: string;
    }>;
    getNotes(customerId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        customerId: number;
        note: string;
    }[]>;
    addNote(customerId: number, dto: CreateCustomerNoteDto, user: {
        id: string;
    }): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        customerId: number;
        note: string;
    }>;
    deleteNote(noteId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        isDeleted: boolean;
        customerId: number;
        note: string;
    }>;
}
