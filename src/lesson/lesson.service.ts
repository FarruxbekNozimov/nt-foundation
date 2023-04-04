import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private lessonRepo: typeof Lesson) { }

  async create(createLessonDto: CreateLessonDto) {
    const res = await this.lessonRepo.create(createLessonDto);
    return res;
  }

  async findAll() {
    return await this.lessonRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.lessonRepo.findByPk(id);
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    return await this.lessonRepo.update(updateLessonDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.lessonRepo.destroy({ where: { id } });
    return result;
  }
}
