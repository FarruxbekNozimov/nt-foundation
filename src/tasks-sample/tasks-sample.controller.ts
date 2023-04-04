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
import { CreateTasksSampleDto } from './dto/create-tasks-sample.dto';
import { UpdateTasksSampleDto } from './dto/update-tasks-sample.dto';
import { TasksSampleService } from './tasks-sample.service';

@ApiTags('TasksSample')
@Controller('tasks-sample')
export class TasksSampleController {
  constructor(private readonly tasksSampleService: TasksSampleService) {}

  @ApiOperation({ summary: 'Create a tasksSample' })
  @Post()
  create(@Body() createTasksSampleDto: CreateTasksSampleDto) {
    return this.tasksSampleService.create(createTasksSampleDto);
  }

  @ApiOperation({ summary: 'Get all tasksSample' })
  @Get()
  findAll() {
    return this.tasksSampleService.findAll();
  }

  @ApiOperation({ summary: 'Get tasksSample' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksSampleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update tasksSample' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTasksSampleDto: UpdateTasksSampleDto,
  ) {
    return await this.tasksSampleService.update(+id, updateTasksSampleDto);
  }

  @ApiOperation({ summary: 'Delete tasksSample' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tasksSampleService.delete(id);
  }
}
