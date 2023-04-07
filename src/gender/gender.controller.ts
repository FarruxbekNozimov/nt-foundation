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
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GenderService } from './gender.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a gender' })
  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all gender' })
  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get gender' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.genderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update gender' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGenderDto: UpdateGenderDto,
  ) {
    return await this.genderService.update(+id, updateGenderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete gender' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.genderService.delete(id);
  }
}
