import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  // Admin: Lấy tất cả phòng
  async getAllRoomsForAdmin(): Promise<Room[]> {
    return this.roomModel.find().populate('bookingDetails');
  }

  // Client: Lấy các phòng còn trống theo thời gian
  async getAllRoomsForClient(checkInDate: Date, checkOutDate: Date): Promise<Room[]> {
    // Tìm các bookingDetail liên quan tới khoảng thời gian bị trùng
    const unavailableRoomStats = await this.bookingDetailModel.aggregate([
      {
        $lookup: {
          from: 'bookings', // bảng booking
          localField: '_id',
          foreignField: 'bookingDetails', // nối qua mảng bookingDetails
          as: 'bookingInfo',
        },
      },
      { $unwind: '$bookingInfo' },
      {
        $match: {
          'bookingInfo.checkInDate': { $lt: checkOutDate },  // start < end
          'bookingInfo.checkOutDate': { $gt: checkInDate },  // end > start
        },
      },
      {
        $group: {
          _id: '$room',
          totalBooked: { $sum: '$quantity' },
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
        $match: {
          $expr: { $gte: ['$totalBooked', '$roomInfo.roomQuantity'] }, // đã đặt >= tổng số phòng
        },
      },
      {
        $project: { _id: 1 }, // chỉ lấy _id của các phòng đã bị đặt hết
      },
    ]);
  
    // Chuyển về Set để lọc nhanh
    const unavailableRoomIdSet = new Set(unavailableRoomStats.map(r => r._id.toString()));
  
    // Lấy tất cả các phòng
    const allRooms = await this.roomModel.find();
  
    // Lọc ra các phòng còn trống
    const availableRooms = allRooms.filter(
      room => !unavailableRoomIdSet.has(room._id.toString())
    );
  
    return availableRooms;
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
}
