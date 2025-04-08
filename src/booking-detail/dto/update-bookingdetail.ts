import {
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Types } from 'mongoose';
  
  export class UpdateBookingDetailDto {
    @IsOptional()
    room?: Types.ObjectId;
  
    @IsOptional()
    @IsNumber()
    quantity?: number;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsNumber()
    discount?: number;
  
    @IsOptional()
    @IsString()
    note?: string;
  }
  