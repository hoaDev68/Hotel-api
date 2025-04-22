import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsEmail,
  IsNumber,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkInDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkOutDate?: Date;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true }) // đảm bảo mỗi ID là ObjectId hợp lệ
  bookingDetails?: string[];
}
