import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Types } from 'mongoose';
  
  export class CreateBookingDetailDto {
    @IsNotEmpty()
    room: Types.ObjectId;
  
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsOptional()
    @IsNumber()
    discount?: number;
  
    @IsOptional()
    @IsString()
    note?: string;
  }
  