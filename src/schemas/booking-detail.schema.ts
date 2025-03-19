import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Booking } from 'src/schemas/booking.schema';
import { Room } from 'src/schemas/room.schema';

@Schema()
export class BookingDetail {
  @Prop({ type: String, required: true, unique: true })
  bookingDetailId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true })
  booking: Booking;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
  room: Room;

  @Prop({ type: String, required: false })
  note?: string;
}

export const BookingDetailSchema = SchemaFactory.createForClass(BookingDetail);
export type BookingDetailDocument = BookingDetail & Document;