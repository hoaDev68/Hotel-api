import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateBookingDto {

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  checkInDate: Date;

  @IsNotEmpty()
  checkOutDate: Date;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => mongoose.Schema.Types.ObjectId)
  bookingDetails?: mongoose.Schema.Types.ObjectId[];
}