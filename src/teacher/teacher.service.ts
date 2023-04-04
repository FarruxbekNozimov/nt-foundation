import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher) private teacherRepo: typeof Teacher) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const res = await this.teacherRepo.create(createTeacherDto);
    return res;
  }

  async findAll() {
    return await this.teacherRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.teacherRepo.findByPk(id);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return await this.teacherRepo.update(updateTeacherDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.teacherRepo.destroy({ where: { id } });
    return result;
  }
}
