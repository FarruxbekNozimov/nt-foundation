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
import { CreateConstraintsDto } from './dto/create-constraints.dto';
import { UpdateConstraintsDto } from './dto/update-constraints.dto';
import { ConstraintsService } from './constraints.service';

@ApiTags('Constraints')
// @Controller('constraints')
export class ConstraintsController {
  constructor(private readonly constraintsService: ConstraintsService) {}

  @ApiOperation({ summary: 'Create a constraints' })
  @Post()
  create(@Body() createConstraintsDto: CreateConstraintsDto) {
    return this.constraintsService.create(createConstraintsDto);
  }

  @ApiOperation({ summary: 'Get all constraints' })
  @Get()
  findAll() {
    return this.constraintsService.findAll();
  }

  @ApiOperation({ summary: 'Get constraints' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.constraintsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update constraints' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConstraintsDto: UpdateConstraintsDto,
  ) {
    return await this.constraintsService.update(+id, updateConstraintsDto);
  }

  @ApiOperation({ summary: 'Delete constraints' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.constraintsService.delete(id);
  }
}
