import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a tasks' })
  @Post()
  create(@Body() createTasksDto: CreateTasksDto) {
    return this.tasksService.create(createTasksDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get tasks' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update tasks' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTasksDto: UpdateTasksDto,
  ) {
    return await this.tasksService.update(+id, updateTasksDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete tasks' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tasksService.delete(id);
  }
}
