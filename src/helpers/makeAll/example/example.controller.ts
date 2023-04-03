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
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { ExampleService } from './example.service';

@ApiTags('Example')
// @Controller
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({ summary: 'Create a example' })
  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @ApiOperation({ summary: 'Get all example' })
  @Get()
  findAll() {
    return this.exampleService.findAll();
  }

  @ApiOperation({ summary: 'Get example' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exampleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update example' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return await this.exampleService.update(+id, updateExampleDto);
  }

  @ApiOperation({ summary: 'Delete example' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.exampleService.delete(id);
  }
}
