import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(BookingDetail.name) private readonly bookingDetailModel: Model<BookingDetail>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const newRoom = new this.roomModel(createRoomDto);
    return await newRoom.save();
  }


  async getAllRooms(checkInDate: Date, checkOutDate: Date, minCapacity: number): Promise<Room[]> {
    return this.roomModel.find({
      $or: [
        { bookingDetails: { $size: 0 } },
        {
          bookingDetails: {
            $not: {
              $elemMatch: {
                $or: [
                  { 'checkOutDate': { $gte: checkInDate } },
                  { 'checkInDate': { $lte: checkOutDate } }
                ]
              }
            }
          }
        }
      ],
      capacity: { $gte: minCapacity }
    }).populate('bookingDetails');
  }

  async getDetailRoom(roomId: string): Promise<Room> {
    const room = await this.roomModel.findOne({ roomId }).populate('bookingDetails');
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async updateRoomStatus(roomId: string, checkInDate: Date, checkOutDate: Date, status: string): Promise<Room> {
    const room = await this.roomModel.findOne({ roomId });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isBooked = await this.bookingDetailModel.exists({
      room: room._id,
      $or: [
        { checkOutDate: { $gte: checkInDate } },
        { checkInDate: { $lte: checkOutDate } }
      ]
    });

    if (isBooked) {
      throw new BadRequestException('Room is already booked during this period');
    }

    room.status = status;
    return await room.save();
  }
}
