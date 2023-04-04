import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';
import { Gender } from './models/gender.model';

@Module({
  imports: [SequelizeModule.forFeature([Gender]), JwtModule],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
