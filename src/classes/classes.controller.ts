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
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { ClassesService } from './classes.service';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @ApiOperation({ summary: 'Create a classes' })
  @Post()
  create(@Body() createClassesDto: CreateClassesDto) {
    return this.classesService.create(createClassesDto);
  }

  @ApiOperation({ summary: 'Get all classes' })
  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @ApiOperation({ summary: 'Get classes' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update classes' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    return await this.classesService.update(+id, updateClassesDto);
  }

  @ApiOperation({ summary: 'Delete classes' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.classesService.delete(id);
  }
}
