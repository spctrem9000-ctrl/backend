import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { NoteService } from '../services/note.service';
import { CreateCustomerTagDto } from '../dto/create-tag.dto';
import { CreateCustomerNoteDto } from '../dto/create-note.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin-Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/customers')
export class AdminCustomerController {
  constructor(
    private readonly tagService: TagService,
    private readonly noteService: NoteService,
  ) {}

  // TAGS
  @Post('tags')
  @ApiOperation({ summary: 'Create a new customer tag' })
  createTag(@Body() dto: CreateCustomerTagDto) {
    return this.tagService.createTag(dto);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all system tags' })
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @Post(':customerId/tags/:tagId')
  @ApiOperation({ summary: 'Assign tag to customer' })
  assignTag(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.tagService.assignTagToCustomer(customerId, tagId);
  }

  @Delete(':customerId/tags/:tagId')
  @ApiOperation({ summary: 'Remove tag from customer' })
  removeTag(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.tagService.removeTagFromCustomer(customerId, tagId);
  }

  // NOTES
  @Get(':customerId/notes')
  @ApiOperation({ summary: 'Get customer CRM notes' })
  getNotes(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.noteService.getNotes(customerId);
  }

  @Post(':customerId/notes')
  @ApiOperation({ summary: 'Add a CRM note to a customer' })
  addNote(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() dto: CreateCustomerNoteDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.noteService.createNote(customerId, dto, user.id);
  }

  @Delete('notes/:noteId')
  @ApiOperation({ summary: 'Delete a CRM note' })
  deleteNote(@Param('noteId', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNote(noteId);
  }
}
