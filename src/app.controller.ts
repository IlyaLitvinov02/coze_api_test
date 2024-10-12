import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  text: string;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create-message')
  async createMessage(@Body() { userId, text }: CreateMessageDto) {
    const result = await this.appService.createMessage({ userId, text })
    return JSON.stringify(result)
  }
}
