import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './models/gender.model';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GenderService {
  constructor(@InjectModel(Gender) private genderRepo: typeof Gender) { }

  async create(createGenderDto: CreateGenderDto) {
    const res = await this.genderRepo.create(createGenderDto);
    return res;
  }

  async findAll() {
    return await this.genderRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.genderRepo.findByPk(id);
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    return await this.genderRepo.update(updateGenderDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.genderRepo.destroy({ where: { id } });
    return result;
  }
}
