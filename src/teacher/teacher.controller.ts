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
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';

@ApiTags('Teacher')
// @Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Create a teacher' })
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Get all teacher' })
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'Get teacher' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teacherService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update teacher' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.teacherService.update(+id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Delete teacher' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.teacherService.delete(id);
  }
}
