import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { Booking } from 'src/schemas/booking.schema';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(BookingDetail.name) private readonly bookingDetailModel: Model<BookingDetail>,
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const newRoom = new this.roomModel(createRoomDto);
    return await newRoom.save();
  }

  // Admin: Lấy tất cả phòng
  async getAllRoomsForAdmin(): Promise<Room[]> {
    return this.roomModel.find().populate('bookingDetails');
  }

  // Client: Lấy các phòng còn trống theo thời gian
  async getAllRoomsForClient(
    checkInDate: Date,
    checkOutDate: Date
  ): Promise<{ room: Room; availableQuantity: number }[]> {
    const result = await this.bookingModel.aggregate([
      {
        $match: {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
      },
      {
        $lookup: {
          from: 'bookingdetails',
          localField: 'bookingDetails',
          foreignField: '_id',
          as: 'details',
        },
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.room', // group theo roomId
          totalBooked: { $sum: '$details.quantity' },
        },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: '_id',
          as: 'roomInfo',
        },
      },
      { $unwind: '$roomInfo' },
      {
        $project: {
          _id: 0,
          room: '$roomInfo',
          availableQuantity: {
            $subtract: ['$roomInfo.roomQuantity', '$totalBooked'],
          },
        },
      },
    ]);
  
    // Lấy tất cả các phòng, đề phòng các phòng không nằm trong bất kỳ booking nào
    const allRooms = await this.roomModel.find();
  
    const resultMap = new Map(result.map(r => [r.room._id.toString(), r]));
  
    const fullResult = allRooms.map(room => {
      const data = resultMap.get(room._id.toString());
      const availableQuantity = data ? Math.max(data.availableQuantity, 0) : room.roomQuantity;
      return { room, availableQuantity };
    });
  
    return fullResult.filter(r => r.availableQuantity > 0); // chỉ trả về phòng còn trống
  }
  
  // Lấy chi tiết 1 phòng
  async getDetailRoom(id: string): Promise<Room> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid room ID');
    }

    const room = await this.roomModel.findById(id).populate('bookingDetails');
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  // Cập nhật trạng thái phòng (theo _id)
  async updateRoomStatus(id: string, checkInDate: Date, checkOutDate: Date, status: string): Promise<Room> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid room ID');
    }

    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isBooked = await this.bookingDetailModel.exists({
      room: room._id,
      $or: [
        { checkOutDate: { $gte: checkInDate } },
        { checkInDate: { $lte: checkOutDate } },
      ],
    });

    if (isBooked) {
      throw new BadRequestException('Room is already booked during this period');
    }

    room.status = status;
    return await room.save();
  }
  //cập nhật thông tin phòng theo id
  async updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid room ID');
    }

    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    Object.assign(room, updateRoomDto);
    return await room.save();
  }

  //xóa 1 phòng theo id
  async deleteRoom(id: string): Promise<Room> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid room ID');
    }

    const room = await this.roomModel.findByIdAndDelete(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }
}
