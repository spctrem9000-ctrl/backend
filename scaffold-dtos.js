const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const dtoDir = 'D:/Menu/backend/src/modules/product/dto';
ensureDir(dtoDir);

fs.writeFileSync(path.join(dtoDir, 'create-extra-group.dto.ts'), `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SelectionType } from '@prisma/client';

export class CreateExtraGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameAr: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty({ enum: SelectionType, default: SelectionType.SINGLE })
  @IsOptional()
  @IsEnum(SelectionType)
  selectionType?: SelectionType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minSelection?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxSelection?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
`);

fs.writeFileSync(path.join(dtoDir, 'update-extra-group.dto.ts'), `import { PartialType } from '@nestjs/swagger';
import { CreateExtraGroupDto } from './create-extra-group.dto';

export class UpdateExtraGroupDto extends PartialType(CreateExtraGroupDto) {}
`);

fs.writeFileSync(path.join(dtoDir, 'create-extra.dto.ts'), `import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateExtraDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameAr: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
`);

fs.writeFileSync(path.join(dtoDir, 'update-extra.dto.ts'), `import { PartialType } from '@nestjs/swagger';
import { CreateExtraDto } from './create-extra.dto';

export class UpdateExtraDto extends PartialType(CreateExtraDto) {}
`);

fs.writeFileSync(path.join(dtoDir, 'gallery.dto.ts'), `import { ApiProperty } from '@nestjs/swagger';
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
`);

console.log('DTOs scaffolded.');
