import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create-message')
  handleSendPulseWebhook({userId, text}: {
    userId: string
    text: string
  }){
    this.appService.handleSendPulseWebhook({userId, text})
  }
}
