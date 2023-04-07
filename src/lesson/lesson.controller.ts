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
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonService } from './lesson.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a lesson' })
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all lesson' })
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get lesson' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lessonService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update lesson' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return await this.lessonService.update(+id, updateLessonDto);
  }

  @ApiOperation({ summary: 'Delete lesson' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.lessonService.delete(id);
  }
}
