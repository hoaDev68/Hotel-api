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

export class UpdateRoomDto {

  @IsOptional()
  @IsNumber()
  roomQuantity?: number;

  @IsOptional()
  @IsString()
  roomType?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  information?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(RoomStatus) 
  status?: RoomStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingDetail)
  bookingDetails?: mongoose.Schema.Types.ObjectId[];
}
