import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Rating } from './models/rating.model';

@Module({
  imports: [SequelizeModule.forFeature([Rating]), JwtModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
