import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './models/student.model';

@Module({
  imports: [SequelizeModule.forFeature([Student]), JwtModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
