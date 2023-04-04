import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { Otp } from './models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Otp]), JwtModule],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
