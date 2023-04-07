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
import { CreateDifficultDto } from './dto/create-difficult.dto';
import { UpdateDifficultDto } from './dto/update-difficult.dto';
import { DifficultService } from './difficult.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Difficult')
@Controller('difficult')
export class DifficultController {
  constructor(private readonly difficultService: DifficultService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a difficult' })
  @Post()
  create(@Body() createDifficultDto: CreateDifficultDto) {
    return this.difficultService.create(createDifficultDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all difficult' })
  @Get()
  findAll() {
    return this.difficultService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get difficult' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.difficultService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update difficult' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDifficultDto: UpdateDifficultDto,
  ) {
    return await this.difficultService.update(+id, updateDifficultDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete difficult' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.difficultService.delete(id);
  }
}
