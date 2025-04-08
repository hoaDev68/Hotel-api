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

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().populate('bookingDetails'); // Xoá 'customer' nếu không có schema đó
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).populate('bookingDetails');
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
}
