import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  BadRequestException,
  Delete
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) { }

  // ----------------------
  // ✅ API: Admin - Lấy tất cả phòng
  // ----------------------
  @Get('/admin/all')
  async getAllRoomsForAdmin() {
    const data = await this.roomService.getAllRoomsForAdmin();
    return {
      message: 'Successfully retrieved all rooms (admin)',
      data,
    };
  }

  // ----------------------
  // ✅ API: Client - Lấy các phòng còn trống
  // ----------------------
  @Get('/client/all')
  async getAllRoomsForClient(
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
    @Query('minCapacity') minCapacity?: number,
  ) {
    if (!checkInDate || !checkOutDate) {
      throw new BadRequestException('Missing checkInDate or checkOutDate');
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      throw new BadRequestException('checkInDate must be before checkOutDate');
    }

    return await this.roomService.getAllRoomsForClient(checkIn, checkOut);
  }


  // ----------------------
  // ✅ API: Lấy chi tiết phòng theo ID
  // ----------------------
  @Get('/:roomId')
  // @UseGuards(JwtAuthGuard)
  async getDetailRoom(@Param('roomId') roomId: string) {
    const data = await this.roomService.getDetailRoom(roomId);
    return {
      message: 'Successfully retrieved room details',
      data,
    };
  }

  // ----------------------
  // ✅ API: Tạo mới phòng
  // ----------------------
  @Post('/create')
  // @UseGuards(JwtAuthGuard)
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    const data = await this.roomService.createRoom(createRoomDto);
    return {
      message: 'Successfully created new room',
      data,
    };
  }

  // ----------------------
  // ✅ API: Cập nhật trạng thái phòng
  // ----------------------
  @Patch('/update-status/:roomId')
  // @UseGuards(JwtAuthGuard)
  async updateRoomStatus(
    @Param('roomId') roomId: string,
    @Body()
    {
      checkInDate,
      checkOutDate,
      status,
    }: { checkInDate: string; checkOutDate: string; status: string },
  ) {
    const data = await this.roomService.updateRoomStatus(
      roomId,
      new Date(checkInDate),
      new Date(checkOutDate),
      status,
    );
    return {
      message: 'Successfully updated room status',
      data,
    };
  }

  //cập nhạt 1 phòng theo id
  @Patch(':id')
  async updateRoomInfo(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.updateRoom(id, updateRoomDto);
  }



  //xóa 1 phòng theo id
  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
