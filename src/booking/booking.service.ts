import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    return this.bookingModel.find().populate(['customer', 'bookingDetails']);
  }

  async getBookingById(bookingId: string): Promise<Booking> {
    const booking = await this.bookingModel.findOne({ bookingId }).populate(['customer', 'bookingDetails']);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async updateBooking(bookingId: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findOneAndUpdate(
      { bookingId },
      updateBookingDto,
      { new: true }
    );
    if (!updatedBooking) {
      throw new NotFoundException('Booking not found');
    }
    return updatedBooking;
  }

  async deleteBooking(bookingId: string): Promise<void> {
    const deletedBooking = await this.bookingModel.findOneAndDelete({ bookingId });
    if (!deletedBooking) {
      throw new NotFoundException('Booking not found');
    }
  }
}
