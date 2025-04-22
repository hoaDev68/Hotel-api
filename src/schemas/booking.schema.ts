import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import { BookingStatus } from 'src/config/constant'; // đường dẫn tùy bạn đặt

@Schema()
export class Booking {
  @Prop({ type: String, required: true })
  customerName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: Date, required: true })
  checkInDate: Date;

  @Prop({ type: Date, required: true })
  checkOutDate: Date;

  @Prop({
    type: String,
    enum: Object.values(BookingStatus), // chỉ cho phép các trạng thái enum
    default: BookingStatus.CONFIRMED,   // mặc định khi tạo mới
    required: true,
  })
  status: BookingStatus;

  @Prop({ type: Number, default: 0 })
  totalAmount: number;

  //thêm trường yêu cầu hủy phòng
  @Prop({ type: Boolean, default: false })
  isCancel: boolean;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookingDetail' }] })
  bookingDetails: BookingDetail[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
