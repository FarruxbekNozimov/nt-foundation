import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Difficult } from './models/difficult.model';
import { CreateDifficultDto } from './dto/create-difficult.dto';
import { UpdateDifficultDto } from './dto/update-difficult.dto';

@Injectable()
export class DifficultService {
  constructor(@InjectModel(Difficult) private difficultRepo: typeof Difficult) { }

  async create(createDifficultDto: CreateDifficultDto) {
    const res = await this.difficultRepo.create(createDifficultDto);
    return res;
  }

  async findAll() {
    return await this.difficultRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.difficultRepo.findByPk(id);
  }

  async update(id: number, updateDifficultDto: UpdateDifficultDto) {
    return await this.difficultRepo.update(updateDifficultDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.difficultRepo.destroy({ where: { id } });
    return result;
  }
}
