import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video) private videoRepo: typeof Video) { }

  async create(createVideoDto: CreateVideoDto) {
    const res = await this.videoRepo.create(createVideoDto);
    return res;
  }

  async findAll() {
    return await this.videoRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.videoRepo.findByPk(id);
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    return await this.videoRepo.update(updateVideoDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.videoRepo.destroy({ where: { id } });
    return result;
  }
}
