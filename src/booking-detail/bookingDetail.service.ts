import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookingDetailDto } from './dto/create-bookingdetail';
import { UpdateBookingDetailDto } from './dto/update-bookingdetail';
import { BookingDetail, BookingDetailDocument } from '../schemas/booking-detail.schema';

@Injectable()
export class BookingDetailService {
  constructor(
    @InjectModel(BookingDetail.name)
    private readonly bookingDetailModel: Model<BookingDetailDocument>,
  ) {}

  // Thêm booking detail
  async create(createDto: CreateBookingDetailDto): Promise<BookingDetail> {
    const created = new this.bookingDetailModel(createDto);
    return created.save();
  }

  // Cập nhật booking detail
  async update(id: string, updateDto: UpdateBookingDetailDto): Promise<BookingDetail> {
    const updated = await this.bookingDetailModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException('Booking detail not found');
    }
    return updated;
  }

  // Xoá booking detail
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.bookingDetailModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Booking detail not found');
    }
    return { message: 'Deleted successfully' };
  }
}
