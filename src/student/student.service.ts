import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private studentRepo: typeof Student) { }

  async create(createStudentDto: CreateStudentDto) {
    const res = await this.studentRepo.create(createStudentDto);
    return res;
  }

  async findAll() {
    return await this.studentRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.studentRepo.findByPk(id);
  }

  async findOneByPhone(phone: string) {
    return await this.studentRepo.findOne({ where: { phone_number: phone } });
  }


  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepo.update(updateStudentDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.studentRepo.destroy({ where: { id } });
    return result;
  }
}
