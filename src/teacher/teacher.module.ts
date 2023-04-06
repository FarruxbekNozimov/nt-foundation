import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './models/teacher.model';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Teacher, Otp]), JwtModule, OtpModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule { }
