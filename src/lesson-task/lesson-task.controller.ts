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
import { CreateLessonTaskDto } from './dto/create-lesson-task.dto';
import { UpdateLessonTaskDto } from './dto/update-lesson-task.dto';
import { LessonTaskService } from './lesson-task.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('LessonTask')
@Controller('lesson-task')
export class LessonTaskController {
  constructor(private readonly lessonTaskService: LessonTaskService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a lessonTask' })
  @Post()
  create(@Body() createLessonTaskDto: CreateLessonTaskDto) {
    return this.lessonTaskService.create(createLessonTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all lessonTask' })
  @Get()
  findAll() {
    return this.lessonTaskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get lessonTask' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lessonTaskService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update lessonTask' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLessonTaskDto: UpdateLessonTaskDto,
  ) {
    return await this.lessonTaskService.update(+id, updateLessonTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete lessonTask' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.lessonTaskService.delete(id);
  }
}
