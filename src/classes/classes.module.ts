import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Classes } from './models/classes.model';

@Module({
  imports: [SequelizeModule.forFeature([Classes]), JwtModule],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
