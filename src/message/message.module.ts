import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './models/message.model';

@Module({
  imports: [SequelizeModule.forFeature([Message]), JwtModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
