import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConstraintsController } from './constraints.controller';
import { ConstraintsService } from './constraints.service';
import { Constraints } from './models/constraints.model';

@Module({
  imports: [SequelizeModule.forFeature([Constraints]), JwtModule],
  controllers: [ConstraintsController],
  providers: [ConstraintsService],
})
export class ConstraintsModule {}
