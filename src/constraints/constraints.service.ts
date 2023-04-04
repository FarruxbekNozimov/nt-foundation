import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Constraints } from './models/constraints.model';
import { CreateConstraintsDto } from './dto/create-constraints.dto';
import { UpdateConstraintsDto } from './dto/update-constraints.dto';

@Injectable()
export class ConstraintsService {
  constructor(@InjectModel(Constraints) private constraintsRepo: typeof Constraints) { }

  async create(createConstraintsDto: CreateConstraintsDto) {
    const res = await this.constraintsRepo.create(createConstraintsDto);
    return res;
  }

  async findAll() {
    return await this.constraintsRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.constraintsRepo.findByPk(id);
  }

  async update(id: number, updateConstraintsDto: UpdateConstraintsDto) {
    return await this.constraintsRepo.update(updateConstraintsDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.constraintsRepo.destroy({ where: { id } });
    return result;
  }
}
