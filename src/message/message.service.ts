import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageRepo: typeof Message) { }

  async create(createMessageDto: CreateMessageDto) {
    const res = await this.messageRepo.create(createMessageDto);
    return res;
  }

  async findAll() {
    return await this.messageRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.messageRepo.findByPk(id);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return await this.messageRepo.update(updateMessageDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.messageRepo.destroy({ where: { id } });
    return result;
  }
}
