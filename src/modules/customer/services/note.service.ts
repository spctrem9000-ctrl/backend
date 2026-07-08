import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(
    customerId: number,
    dto: CreateCustomerNoteDto,
    adminId: string,
  ) {
    return this.prisma.customerNote.create({
      data: {
        note: dto.note,
        customerId,
        createdBy: adminId,
      },
    });
  }

  async getNotes(customerId: number) {
    return this.prisma.customerNote.findMany({
      where: { customerId, isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteNote(noteId: number) {
    const note = await this.prisma.customerNote.findUnique({
      where: { id: noteId, isDeleted: false },
    });
    if (!note) throw new NotFoundException('Note not found');

    return this.prisma.customerNote.update({
      where: { id: noteId },
      data: { isDeleted: true },
    });
  }
}
