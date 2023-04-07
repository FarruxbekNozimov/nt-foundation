import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from './models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Otp]), JwtModule],
  controllers: [],
  providers: [],
  exports:[]
})
export class OtpModule { }
