import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from 'src/schemas/room.schema'; 
import { BookingDetail, BookingDetailSchema } from 'src/schemas/booking-detail.schema'; // Thêm import
import { Booking, BookingSchema } from 'src/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: BookingDetail.name, schema: BookingDetailSchema }, // Thêm BookingDetail
      { name: Booking.name, schema: BookingSchema }, 
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
