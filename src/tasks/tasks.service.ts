import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './models/tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private tasksRepo: typeof Tasks) { }

  async create(createTasksDto: CreateTasksDto) {
    try {
      const res = await this.tasksRepo.create(createTasksDto);
      return res;      
    } catch (error) {
      throw new BadRequestException('Bunday Id dagi hali mavjud emas !!!');
    }
  }

  async findAll() {
    return await this.tasksRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.tasksRepo.findByPk(id);
  }

  async update(id: number, updateTasksDto: UpdateTasksDto) {
    return await this.tasksRepo.update(updateTasksDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.tasksRepo.destroy({ where: { id } });
    return result;
  }
}
