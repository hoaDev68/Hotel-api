import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Delete,
  } from '@nestjs/common';
  import { BookingDetailService } from './bookingDetail.service';
  import { CreateBookingDetailDto } from './dto/create-bookingdetail';
  import { UpdateBookingDetailDto } from './dto/update-bookingdetail';
  
  @Controller('bookingDetails')
  export class BookingDetailController {
    constructor(private readonly bookingDetailService: BookingDetailService) {}
  
    @Post()
    create(@Body() createDto: CreateBookingDetailDto) {
      return this.bookingDetailService.create(createDto);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateDto: UpdateBookingDetailDto,
    ) {
      return this.bookingDetailService.update(id, updateDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.bookingDetailService.delete(id);
    }
  }
  