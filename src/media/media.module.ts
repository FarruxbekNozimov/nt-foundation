import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './models/media.model';

@Module({
  imports: [SequelizeModule.forFeature([Media]), JwtModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
