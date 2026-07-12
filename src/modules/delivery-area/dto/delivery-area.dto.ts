import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeliveryAreaDto {
  @ApiProperty({ example: 'New Cairo' })
  @IsString()
  nameEn: string;

  @ApiProperty({ example: 'القاهرة الجديدة' })
  @IsString()
  nameAr: string;

  @ApiProperty({ example: 30.5 })
  @IsNumber()
  deliveryFee: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDeliveryAreaDto {
  @ApiPropertyOptional({ example: 'New Cairo' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ example: 'القاهرة الجديدة' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 30.5 })
  @IsOptional()
  @IsNumber()
  deliveryFee?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
