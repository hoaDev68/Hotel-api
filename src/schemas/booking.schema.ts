import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from 'src/schemas/customer.schema';
import { BookingDetail } from 'src/schemas/booking-detail.schema';

@Schema()
export class Booking {
  @Prop({ type: String, required: true, unique: true })
  bookingId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop({ type: Date, required: true })
  checkInDate: Date;

  @Prop({ type: Date, required: true })
  checkOutDate: Date;

  @Prop({ type: Number, default: 0 })
  totalAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookingDetail' }] })
  bookingDetails: BookingDetail[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);