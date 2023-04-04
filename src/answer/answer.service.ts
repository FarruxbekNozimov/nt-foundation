import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './models/answer.model';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepo: typeof Answer) { }

  async create(createAnswerDto: CreateAnswerDto) {
    const res = await this.answerRepo.create(createAnswerDto);
    return res;
  }

  async findAll() {
    return await this.answerRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.answerRepo.findByPk(id);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.answerRepo.update(updateAnswerDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.answerRepo.destroy({ where: { id } });
    return result;
  }
}
