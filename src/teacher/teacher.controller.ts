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
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AdminAuthGuard } from '../guards/admin-auth.guards';
import { UserSelfGuard } from "../guards/user-self.guards";


@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a teacher' })
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all teacher' })
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get teacher' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teacherService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update teacher' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.teacherService.update(+id, updateTeacherDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete teacher' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.teacherService.delete(id);
  }

}
