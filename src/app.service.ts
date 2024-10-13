import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Stream } from 'stream';
import { CozeEventParserService } from './coze-event-parser-service';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly cozeEventParserService: CozeEventParserService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async createMessage({text, userId, conversationId}: {
    text: string
    userId: string,
    conversationId?: string
  }) {
    const response = await lastValueFrom(
      this.httpService.post(
        "https://api.coze.com/v3/chat",
        {
          stream: true,
          bot_id: '7368357412157489158',
          user_id: userId,
          additional_messages: [{ role: 'user', content_type: 'text', content: text }],
        },
        {
          params: {
            conversation_id: conversationId,
          },
          headers: {
            "Authorization": "Bearer pat_OdgLSrNrR9XzTpf8XJTsu3yVXxcmzoCK4fTO5Cj9tyuTF8FNBlC9GGJLUQzFPhs2",
            "Content-Type": "application/json",
          },
        }
      )
    );
    const parsedEvents = this.cozeEventParserService.parseCozeData(response.data)
    const completedMessage = parsedEvents.find(({ event }) => event === "conversation.message.completed")?.data
    const failedMessage = parsedEvents.find(({ event }) => event === "conversation.chat.failed")?.data
    if (completedMessage) {
      return completedMessage
    }
    if (failedMessage) {
      throw new BadRequestException(failedMessage)
    }
  }
}
