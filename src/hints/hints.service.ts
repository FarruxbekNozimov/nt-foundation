import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hints } from './models/hints.model';
import { CreateHintsDto } from './dto/create-hints.dto';
import { UpdateHintsDto } from './dto/update-hints.dto';

@Injectable()
export class HintsService {
  constructor(@InjectModel(Hints) private hintsRepo: typeof Hints) { }

  async create(createHintsDto: CreateHintsDto) {
    const res = await this.hintsRepo.create(createHintsDto);
    return res;
  }

  async findAll() {
    return await this.hintsRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.hintsRepo.findByPk(id);
  }

  async update(id: number, updateHintsDto: UpdateHintsDto) {
    return await this.hintsRepo.update(updateHintsDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.hintsRepo.destroy({ where: { id } });
    return result;
  }
}
