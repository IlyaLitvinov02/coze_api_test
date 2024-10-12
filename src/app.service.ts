import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async createMessage({ userId, text }: {
    text: string
    userId: string
  }) {
    const conversationId = '7424996473340805126' //response.data.data.conversation_id

    const response = await lastValueFrom(
      this.httpService.post("https://api.coze.com/v3/chat",
        {
          stream: false,
          bot_id: '7368357412157489158',
          user_id: userId,
          additional_messages: [{ role: 'user', content_type: 'text', content: text }]
        },
        {
          params: {
            conversation_id: conversationId,
          },
          headers: {
            "Authorization": "Bearer pat_OdgLSrNrR9XzTpf8XJTsu3yVXxcmzoCK4fTO5Cj9tyuTF8FNBlC9GGJLUQzFPhs2",
            "Content-Type": "application/json",
          }
        }
      )
    )
    console.log('response: ', JSON.stringify(response.data))
    await new Promise(resolve => setTimeout(resolve, 30000))
    const messageId = response.data.data.id
    const messageResponse = await lastValueFrom(
      this.httpService.post("https://api.coze.com/v1/conversation/message/list", {},
        {
          params: {
            conversation_id: conversationId,
          },
          headers: {
            "Authorization": "Bearer pat_OdgLSrNrR9XzTpf8XJTsu3yVXxcmzoCK4fTO5Cj9tyuTF8FNBlC9GGJLUQzFPhs2",
            "Content-Type": "application/json",
          }
        }
      )
    )
    console.log('messageResponse: ', JSON.stringify(messageResponse.data))

    return messageResponse.data.data[0]
  }
}
