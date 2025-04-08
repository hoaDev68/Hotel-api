import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import mongoose from 'mongoose';

enum RoomStatus {
  TRONG = 'TRONG',
  DANG_SU_DUNG = 'DANG_SU_DUNG',
  DA_DAT = 'DA_DAT',
}

export class CreateRoomDto {

  @IsNotEmpty()
  @IsNumber()
  roomQuantity: number;

  @IsNotEmpty()
  @IsString()
  roomType: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  information?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(RoomStatus) 
  status: RoomStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingDetail)
  bookingDetails?: mongoose.Schema.Types.ObjectId[];
}