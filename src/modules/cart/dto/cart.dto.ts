import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  Min,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddCartItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  extraIds?: number[];
}

export class UpdateCartItemQuantityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class ApplyCouponDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}
