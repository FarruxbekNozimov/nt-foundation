import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LessonTask } from './models/lesson-task.model';
import { CreateLessonTaskDto } from './dto/create-lesson-task.dto';
import { UpdateLessonTaskDto } from './dto/update-lesson-task.dto';

@Injectable()
export class LessonTaskService {
  constructor(@InjectModel(LessonTask) private lessonTaskRepo: typeof LessonTask) { }

  async create(createLessonTaskDto: CreateLessonTaskDto) {
    const res = await this.lessonTaskRepo.create(createLessonTaskDto);
    return res;
  }

  async findAll() {
    return await this.lessonTaskRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.lessonTaskRepo.findByPk(id);
  }

  async update(id: number, updateLessonTaskDto: UpdateLessonTaskDto) {
    return await this.lessonTaskRepo.update(updateLessonTaskDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.lessonTaskRepo.destroy({ where: { id } });
    return result;
  }
}
