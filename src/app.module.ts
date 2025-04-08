import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

// Modules
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { BookingDetailModule } from './booking-detail/bookingDetail.module';

// Controllers & Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Middleware
import LogsMiddleware from './middleware/logger.middleware';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_booking';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RoomModule,
    BookingModule,
    BookingDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}