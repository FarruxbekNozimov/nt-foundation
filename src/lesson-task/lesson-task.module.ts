import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { LessonTaskController } from './lesson-task.controller';
import { LessonTaskService } from './lesson-task.service';
import { LessonTask } from './models/lesson-task.model';

@Module({
  imports: [SequelizeModule.forFeature([LessonTask]), JwtModule],
  controllers: [LessonTaskController],
  providers: [LessonTaskService],
})
export class LessonTaskModule {}
