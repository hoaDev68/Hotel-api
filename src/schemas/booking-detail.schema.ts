import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Room } from 'src/schemas/room.schema';

@Schema()
export class BookingDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
  room: Room;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: String, required: false })
  note?: string;
}

export const BookingDetailSchema = SchemaFactory.createForClass(BookingDetail);
