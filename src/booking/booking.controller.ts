import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/schemas/booking.schema';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.getBookingById(id);
  }

  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookingService.deleteBooking(id);
  }
}
