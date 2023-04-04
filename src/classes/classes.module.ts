import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ClassController } from './classes.controller';
import { ClassService } from './classes.service';
import { Class } from './models/classes.model';

@Module({
  imports: [SequelizeModule.forFeature([Class]), JwtModule],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
