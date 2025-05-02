// bot.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('ask')
  async askBot(@Body('message') message: string) {
    const response = this.botService.getResponse(message);
    return { answer: response };
  }
}
