import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsEmail,
  IsDate,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { BookingStatus } from 'src/config/constant';

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
  @Type(() => Date)
  @IsDate()
  checkInDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  checkOutDate: Date;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true }) // Kiểm tra từng phần tử là ObjectId hợp lệ
  bookingDetails?: string[];
}
