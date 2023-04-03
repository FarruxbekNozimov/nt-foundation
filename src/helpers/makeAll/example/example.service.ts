import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Example } from './models/example.model';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(Example) private exampleRepo: typeof Example) { }

  async create(createExampleDto: CreateExampleDto) {
    const res = await this.exampleRepo.create(createExampleDto);
    return res;
  }

  async findAll() {
    return await this.exampleRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.exampleRepo.findByPk(id);
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    return await this.exampleRepo.update(updateExampleDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.exampleRepo.destroy({ where: { id } });
    return result;
  }
}
