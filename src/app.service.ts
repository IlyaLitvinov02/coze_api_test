import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async handleSendPulseWebhook({ userId, text }: {
    text: string
    userId: string
  }) {
    const response = await lastValueFrom(
      this.httpService.post("https://api.coze.com/v3/chat",
        {
          stream: true,
          bot_id: '7368357412157489158',
          user_id: userId,
          additional_messages: [{ role: 'user', content_type: 'text', content: text }]
        },
        {
          headers: {
            "Authorization": "Bearer pat_OdgLSrNrR9XzTpf8XJTsu3yVXxcmzoCK4fTO5Cj9tyuTF8FNBlC9GGJLUQzFPhs2",
            "Content-Type": "application/json",
          }
        }
      ))
    return response
  }
}
