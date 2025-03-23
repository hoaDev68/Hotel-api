import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { BookingDetail, BookingDetailSchema } from 'src/schemas/booking-detail.schema';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: BookingDetail.name, schema: BookingDetailSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
