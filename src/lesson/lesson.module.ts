import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Lesson } from './models/lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson]), JwtModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
