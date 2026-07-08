import { TagService } from '../services/tag.service';
import { NoteService } from '../services/note.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';
export declare class AdminCustomerController {
    private readonly tagService;
    private readonly noteService;
    constructor(tagService: TagService, noteService: NoteService);
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
