import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './models/teacher.model';

@Module({
  imports: [SequelizeModule.forFeature([Teacher]), JwtModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule { }
