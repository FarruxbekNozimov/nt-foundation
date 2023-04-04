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
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerService } from './answer.service';

@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ summary: 'Create a answer' })
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @ApiOperation({ summary: 'Get all answer' })
  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @ApiOperation({ summary: 'Get answer' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update answer' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return await this.answerService.update(+id, updateAnswerDto);
  }

  @ApiOperation({ summary: 'Delete answer' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.answerService.delete(id);
  }
}
