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
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @ApiOperation({ summary: 'Create a student' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Get all student' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Get student' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update student' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete student' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.studentService.delete(id);
  }
}
