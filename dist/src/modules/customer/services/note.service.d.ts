import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';
export declare class NoteService {
    private prisma;
    constructor(prisma: PrismaService);
    createNote(customerId: number, dto: CreateCustomerNoteDto, adminId: string): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }>;
    getNotes(customerId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }[]>;
    deleteNote(noteId: number): Promise<{
        id: number;
        guid: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        createdBy: string | null;
        customerId: number;
        note: string;
    }>;
}
