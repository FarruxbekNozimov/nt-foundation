import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTasksExampleDto } from './dto/create-tasks-tasksTasksExample.dto';
import { UpdateTasksExampleDto } from './dto/update-tasks-tasksTasksExample.dto';
import { TasksExampleService } from './tasks-tasksTasksExample.service';

@ApiTags('TasksExample')
@Controller('tasks-tasksTasksExample')
export class TasksExampleController {
  constructor(private readonly tasksTasksExampleService: TasksExampleService) {}

  @ApiOperation({ summary: 'Create a tasksTasksExample' })
  @Post()
  create(@Body() createTasksExampleDto: CreateTasksExampleDto) {
    return this.tasksTasksExampleService.create(createTasksExampleDto);
  }

  @ApiOperation({ summary: 'Get all tasksTasksExample' })
  @Get()
  findAll() {
    return this.tasksTasksExampleService.findAll();
  }

  @ApiOperation({ summary: 'Get tasksTasksExample' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksTasksExampleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update tasksTasksExample' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTasksExampleDto: UpdateTasksExampleDto,
  ) {
    return await this.tasksTasksExampleService.update(+id, updateTasksExampleDto);
  }

  @ApiOperation({ summary: 'Delete tasksTasksExample' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tasksTasksExampleService.delete(id);
  }
}
