import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './models/classes.model';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class) private classRepo: typeof Class) { }

  async create(createClassDto: CreateClassDto) {
    const res = await this.classRepo.create(createClassDto);
    return res;
  }

  async findAll() {
    return await this.classRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.classRepo.findByPk(id);
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    return await this.classRepo.update(updateClassDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.classRepo.destroy({ where: { id } });
    return result;
  }
}
