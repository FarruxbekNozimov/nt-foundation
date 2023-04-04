import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Class } from './models/class.model';

@Module({
  imports: [SequelizeModule.forFeature([Class]), JwtModule],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
