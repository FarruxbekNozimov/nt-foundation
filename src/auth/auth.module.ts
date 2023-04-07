import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TeacherModule } from '../teacher/teacher.module';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/models/otp.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentModule } from '../student/student.module';
import { Teacher } from '../teacher/models/teacher.model';
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [SequelizeModule.forFeature([Otp]),
  forwardRef(() => TeacherModule),
  forwardRef(() => StudentModule),
  forwardRef(() => AdminModule),
    OtpModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }
