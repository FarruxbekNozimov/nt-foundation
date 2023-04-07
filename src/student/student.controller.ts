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
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { UserSelfGuard } from '../guards/user-self.guards';
import { AdminAuthGuard } from '../guards/admin-auth.guards';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a student' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all student' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get student' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update student' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete student' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.studentService.delete(id);
  }
}
