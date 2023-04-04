import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classes } from './models/classes.model';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Classes) private classesRepo: typeof Classes) { }

  async create(createClassesDto: CreateClassesDto) {
    const res = await this.classesRepo.create(createClassesDto);
    return res;
  }

  async findAll() {
    return await this.classesRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.classesRepo.findByPk(id);
  }

  async update(id: number, updateClassesDto: UpdateClassesDto) {
    return await this.classesRepo.update(updateClassesDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.classesRepo.destroy({ where: { id } });
    return result;
  }
}
