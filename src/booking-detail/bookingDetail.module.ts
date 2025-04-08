import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingDetailService } from './bookingDetail.service';
import { BookingDetailController } from './bookingDetail.controler';
import { BookingDetail, BookingDetailSchema } from '../schemas/booking-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingDetail.name, schema: BookingDetailSchema },
    ]),
  ],
  controllers: [BookingDetailController],
  providers: [BookingDetailService],
})
export class BookingDetailModule {}
