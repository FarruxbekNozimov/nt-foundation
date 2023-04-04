import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Tasks } from './models/tasks.model';

@Module({
  imports: [SequelizeModule.forFeature([Tasks]), JwtModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
