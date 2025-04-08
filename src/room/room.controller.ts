import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
// import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

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
    const data = await this.roomService.getAllRoomsForClient(
      new Date(checkInDate),
      new Date(checkOutDate),
    );

    // Nếu muốn lọc theo minCapacity:
    const filtered =
      minCapacity != null
        ? data.filter((room) => room.capacity >= minCapacity)
        : data;

    return {
      message: 'Successfully retrieved available rooms (client)',
      data: filtered,
    };
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
}
