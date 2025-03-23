import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsEmail,
  IsNumber,
} from 'class-validator';
import mongoose from 'mongoose';

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
  checkInDate?: Date;

  @IsOptional()
  checkOutDate?: Date;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => mongoose.Schema.Types.ObjectId)
  bookingDetails?: mongoose.Schema.Types.ObjectId[];
}
