import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TasksExampleController } from './tasks-tasksTasksExample.controller';
import { TasksExampleService } from './tasks-tasksTasksExample.service';
import { TasksExample } from './models/tasks-tasksTasksExample.model';

@Module({
  imports: [SequelizeModule.forFeature([TasksExample]), JwtModule],
  controllers: [TasksExampleController],
  providers: [TasksExampleService],
})
export class TasksExampleModule {}
