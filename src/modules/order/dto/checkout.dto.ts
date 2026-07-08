import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderType, PaymentMethod } from '@prisma/client';

export class CheckoutDto {
  @ApiProperty({ enum: OrderType })
  @IsNotEmpty()
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ enum: PaymentMethod })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  addressId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderNotes?: string;
}
