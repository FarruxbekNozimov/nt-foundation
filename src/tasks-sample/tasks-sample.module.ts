import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TasksSampleController } from './tasks-sample.controller';
import { TasksSampleService } from './tasks-sample.service';
import { TasksSample } from './models/tasks-sample.model';

@Module({
  imports: [SequelizeModule.forFeature([TasksSample]), JwtModule],
  controllers: [TasksSampleController],
  providers: [TasksSampleService],
})
export class TasksSampleModule {}
