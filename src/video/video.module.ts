import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './models/video.model';

@Module({
  imports: [SequelizeModule.forFeature([Video]), JwtModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
