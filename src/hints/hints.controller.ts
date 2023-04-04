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
import { CreateHintsDto } from './dto/create-hints.dto';
import { UpdateHintsDto } from './dto/update-hints.dto';
import { HintsService } from './hints.service';

@ApiTags('Hints')
@Controller('hints')
export class HintsController {
  constructor(private readonly hintsService: HintsService) {}

  @ApiOperation({ summary: 'Create a hints' })
  @Post()
  create(@Body() createHintsDto: CreateHintsDto) {
    return this.hintsService.create(createHintsDto);
  }

  @ApiOperation({ summary: 'Get all hints' })
  @Get()
  findAll() {
    return this.hintsService.findAll();
  }

  @ApiOperation({ summary: 'Get hints' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hintsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update hints' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHintsDto: UpdateHintsDto,
  ) {
    return await this.hintsService.update(+id, updateHintsDto);
  }

  @ApiOperation({ summary: 'Delete hints' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.hintsService.delete(id);
  }
}
