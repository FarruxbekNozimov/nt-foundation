import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TasksSample } from './models/tasks-sample.model';
import { CreateTasksSampleDto } from './dto/create-tasks-sample.dto';
import { UpdateTasksSampleDto } from './dto/update-tasks-sample.dto';

@Injectable()
export class TasksSampleService {
  constructor(@InjectModel(TasksSample) private tasksSampleRepo: typeof TasksSample) { }

  async create(createTasksSampleDto: CreateTasksSampleDto) {
    const res = await this.tasksSampleRepo.create(createTasksSampleDto);
    return res;
  }

  async findAll() {
    return await this.tasksSampleRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.tasksSampleRepo.findByPk(id);
  }

  async update(id: number, updateTasksSampleDto: UpdateTasksSampleDto) {
    return await this.tasksSampleRepo.update(updateTasksSampleDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.tasksSampleRepo.destroy({ where: { id } });
    return result;
  }
}
