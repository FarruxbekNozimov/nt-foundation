import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { HintsController } from './hints.controller';
import { HintsService } from './hints.service';
import { Hints } from './models/hints.model';

@Module({
  imports: [SequelizeModule.forFeature([Hints]), JwtModule],
  controllers: [HintsController],
  providers: [HintsService],
})
export class HintsModule {}
