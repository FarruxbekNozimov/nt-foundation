import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './models/media.model';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaRepo: typeof Media) { }

  async create(createMediaDto: CreateMediaDto) {
    const res = await this.mediaRepo.create(createMediaDto);
    return res;
  }

  async findAll() {
    return await this.mediaRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.mediaRepo.findByPk(id);
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    return await this.mediaRepo.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.mediaRepo.destroy({ where: { id } });
    return result;
  }
}
