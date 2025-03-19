import { Body, Controller, Post, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/all')
 //@UseGuards(JwtAuthGuard)
  async getAllRooms(
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
    @Query('minCapacity') minCapacity: number
  ) {
    const data = await this.roomService.getAllRooms(new Date(checkInDate), new Date(checkOutDate), Number(minCapacity));
    return { message: 'Successfully retrieved room list', data };
  }

  @Get('/:roomId')
 //@UseGuards(JwtAuthGuard)
  async getDetailRoom(@Param('roomId') roomId: string) {
    const data = await this.roomService.getDetailRoom(roomId);
    return { message: 'Successfully retrieved room details', data };
  }

  @Patch('/update-status/:roomId')
 //@UseGuards(JwtAuthGuard)
  async updateRoomStatus(
    @Param('roomId') roomId: string,
    @Body() { checkInDate, checkOutDate, status }: { checkInDate: string; checkOutDate: string; status: string }
  ) {
    const data = await this.roomService.updateRoomStatus(roomId, new Date(checkInDate), new Date(checkOutDate), status);
    return { message: 'Successfully updated room status', data };
  }

  @Post('/create')
 //@UseGuards(JwtAuthGuard)
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    const data = await this.roomService.createRoom(createRoomDto);
    return { message: 'Successfully created new room', data };
  }
}
