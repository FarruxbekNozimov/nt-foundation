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
import { CreateTasksSampleDto } from './dto/create-tasks-sample.dto';
import { UpdateTasksSampleDto } from './dto/update-tasks-sample.dto';
import { TasksSampleService } from './tasks-sample.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('TasksSample')
@Controller('tasks-sample')
export class TasksSampleController {
  constructor(private readonly tasksSampleService: TasksSampleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a tasksSample' })
  @Post()
  create(@Body() createTasksSampleDto: CreateTasksSampleDto) {
    return this.tasksSampleService.create(createTasksSampleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasksSample' })
  @Get()
  findAll() {
    return this.tasksSampleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get tasksSample' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksSampleService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update tasksSample' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTasksSampleDto: UpdateTasksSampleDto,
  ) {
    return await this.tasksSampleService.update(+id, updateTasksSampleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete tasksSample' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tasksSampleService.delete(id);
  }
}
