import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './models/answer.model';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([Answer]), JwtModule, AdminModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
