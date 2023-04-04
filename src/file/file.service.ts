import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './models/file.model';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(@InjectModel(File) private fileRepo: typeof File) { }

  async create(createFileDto: CreateFileDto) {
    const res = await this.fileRepo.create(createFileDto);
    return res;
  }

  async findAll() {
    return await this.fileRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.fileRepo.findByPk(id);
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return await this.fileRepo.update(updateFileDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.fileRepo.destroy({ where: { id } });
    return result;
  }
}
