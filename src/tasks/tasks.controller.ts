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
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a tasks' })
  @Post()
  create(@Body() createTasksDto: CreateTasksDto) {
    return this.tasksService.create(createTasksDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get tasks' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update tasks' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTasksDto: UpdateTasksDto,
  ) {
    return await this.tasksService.update(+id, updateTasksDto);
  }

  @ApiOperation({ summary: 'Delete tasks' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tasksService.delete(id);
  }
}
