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
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a classes' })
  @Post()
  create(@Body() createClassesDto: CreateClassesDto) {
    return this.classesService.create(createClassesDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all classes' })
  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get classes' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update classes' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    return await this.classesService.update(+id, updateClassesDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete classes' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.classesService.delete(id);
  }
}
