import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BookingDetail } from 'src/schemas/booking-detail.schema';

@Schema()
export class Room {

  @Prop({ type: String, required: true })
  roomType: string;
  
  @Prop({ type: Number, required: true })
  roomQuantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  capacity: number;

  @Prop({ type: String, required: false })
  information?: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ 
    type: String, 
    enum: ['TRONG', 'DANG_SU_DUNG', 'DA_DAT'], 
    default: 'TRONG' 
  })
  status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookingDetail' }] })
  bookingDetails: BookingDetail[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

export type RoomDocument = Room & Document;
