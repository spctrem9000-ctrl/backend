import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GalleryReorderItemDto {
  @ApiProperty()
  @IsNumber()
  imageId: number;

  @ApiProperty()
  @IsNumber()
  sortOrder: number;
}

export class ReorderGalleryDto {
  @ApiProperty({ type: [GalleryReorderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryReorderItemDto)
  items: GalleryReorderItemDto[];
}
