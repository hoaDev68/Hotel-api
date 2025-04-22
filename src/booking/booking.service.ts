import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/schemas/booking.schema';
import { BookingDetail } from 'src/schemas/booking-detail.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(BookingDetail.name) private bookingDetailModel: Model<BookingDetail>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    return await newBooking.save();
  }

  async getAllBookings(date: Date, status?: string): Promise<Booking[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
  
    const query: any = {
      $or: [
        {
          checkInDate: { $gte: startOfDay, $lte: endOfDay },
        },
        {
          checkOutDate: { $gte: startOfDay, $lte: endOfDay },
        },
      ],
    };
  
    if (status) {
      query.status = status;
    }
  
    return this.bookingModel.find(query).populate('bookingDetails');
  }
  
  //Tìm kiếm phiếu đặt theo số điện thoại
  async getBookingByPhoneNumber(phoneNumber: string): Promise<Booking[]> {
    return this.bookingModel.find({ phoneNumber })
    .populate({
      path: 'bookingDetails',
      populate: {
        path: 'room',
        model: 'Room' // Đảm bảo tên model đúng như bạn khai báo
      }
    })
    .exec();
  }
  
 
  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id)
      .populate({
        path: 'bookingDetails',
        populate: {
          path: 'room',
          model: 'Room'
        }
      });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async updateBooking(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateBookingDto,
      { new: true }
    );
    if (!updatedBooking) {
      throw new NotFoundException('Booking not found');
    }
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new NotFoundException('Booking not found');
    }
  }
  async changeBookingStatus(id: string, newStatus: string): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
  
    if (!updated) {
      throw new NotFoundException('Booking not found');
    }
  
    return updated;
  }
  //hàm yêu cầu hủy phòng cho khách hàng 
  async requestCancelBooking(id: string): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(
      id,
      { isCancel: true },
      { new: true }
    );
  
    if (!updated) {
      throw new NotFoundException('Booking not found');
    }
  
    return updated;
  }
}
