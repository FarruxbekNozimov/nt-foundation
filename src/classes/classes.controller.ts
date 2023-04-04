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
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { ClassService } from './classes.service';

@ApiTags('Class')
// @Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: 'Create a class' })
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @ApiOperation({ summary: 'Get all class' })
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @ApiOperation({ summary: 'Get class' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update class' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.classService.update(+id, updateClassDto);
  }

  @ApiOperation({ summary: 'Delete class' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.classService.delete(id);
  }
}
