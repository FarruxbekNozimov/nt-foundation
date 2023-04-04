import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating) private ratingRepo: typeof Rating) { }

  async create(createRatingDto: CreateRatingDto) {
    const res = await this.ratingRepo.create(createRatingDto);
    return res;
  }

  async findAll() {
    return await this.ratingRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.ratingRepo.findByPk(id);
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    return await this.ratingRepo.update(updateRatingDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.ratingRepo.destroy({ where: { id } });
    return result;
  }
}
