import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Booking } from 'src/schemas/booking.schema';

@Schema()
export class Customer {
  @Prop({ type: String, required: true, unique: true })
  customerId: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, unique: true, required: true })
  idCard: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] })
  bookings: Booking[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
