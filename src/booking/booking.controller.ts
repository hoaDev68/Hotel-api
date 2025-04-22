import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query, BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/schemas/booking.schema';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  // booking.controller.ts

  @Get('')
  async getAllBookings(
    @Query('date') dateStr: string,
    @Query('status') status?: string,
  ) {
    if (!dateStr) {
      throw new BadRequestException('Date is required');
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.bookingService.getAllBookings(date, status);
  }

  //tìm kiếm phiếu đặt theo số điện thoại
  @Get('search')
  async getBookingByPhoneNumber(@Query('phoneNumber') phoneNumber: string): Promise<Booking[]> {
    return this.bookingService.getBookingByPhoneNumber(phoneNumber);
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
  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body('status') newStatus: string,
  ) {
    return this.bookingService.changeBookingStatus(id, newStatus);
  }

  //hàm yêu cầu hủy phòng cho khách hàng 
  @Patch(':id/cancel')
  requestCancelBooking(@Param('id') id: string) {
    return this.bookingService.requestCancelBooking(id);
  }

}
