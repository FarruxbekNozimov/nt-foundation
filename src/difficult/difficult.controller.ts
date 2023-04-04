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
import { CreateDifficultDto } from './dto/create-difficult.dto';
import { UpdateDifficultDto } from './dto/update-difficult.dto';
import { DifficultService } from './difficult.service';

@ApiTags('Difficult')
@Controller('difficult')
export class DifficultController {
  constructor(private readonly difficultService: DifficultService) {}

  @ApiOperation({ summary: 'Create a difficult' })
  @Post()
  create(@Body() createDifficultDto: CreateDifficultDto) {
    return this.difficultService.create(createDifficultDto);
  }

  @ApiOperation({ summary: 'Get all difficult' })
  @Get()
  findAll() {
    return this.difficultService.findAll();
  }

  @ApiOperation({ summary: 'Get difficult' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.difficultService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update difficult' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDifficultDto: UpdateDifficultDto,
  ) {
    return await this.difficultService.update(+id, updateDifficultDto);
  }

  @ApiOperation({ summary: 'Delete difficult' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.difficultService.delete(id);
  }
}
