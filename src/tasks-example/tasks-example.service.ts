import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TasksExample } from './models/tasks-tasksTasksExample.model';
import { CreateTasksExampleDto } from './dto/create-tasks-tasksTasksExample.dto';
import { UpdateTasksExampleDto } from './dto/update-tasks-tasksTasksExample.dto';

@Injectable()
export class TasksExampleService {
  constructor(@InjectModel(TasksExample) private tasksTasksExampleRepo: typeof TasksExample) { }

  async create(createTasksExampleDto: CreateTasksExampleDto) {
    const res = await this.tasksTasksExampleRepo.create(createTasksExampleDto);
    return res;
  }

  async findAll() {
    return await this.tasksTasksExampleRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.tasksTasksExampleRepo.findByPk(id);
  }

  async update(id: number, updateTasksExampleDto: UpdateTasksExampleDto) {
    return await this.tasksTasksExampleRepo.update(updateTasksExampleDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.tasksTasksExampleRepo.destroy({ where: { id } });
    return result;
  }
}
