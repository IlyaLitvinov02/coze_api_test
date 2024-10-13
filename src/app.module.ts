import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CozeEventParserService } from './coze-event-parser-service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, CozeEventParserService],
})
export class AppModule {}
