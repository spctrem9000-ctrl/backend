import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerNoteDto {
  @ApiProperty({ example: 'Customer prefers calls before delivery.' })
  @IsString()
  note: string;
}
