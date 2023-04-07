import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { DifficultController } from './difficult.controller';
import { DifficultService } from './difficult.service';
import { Difficult } from './models/difficult.model';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([Difficult]), JwtModule, AdminModule],
  controllers: [DifficultController],
  providers: [DifficultService],
})
export class DifficultModule {}
