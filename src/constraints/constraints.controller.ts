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
import { CreateConstraintsDto } from './dto/create-constraints.dto';
import { UpdateConstraintsDto } from './dto/update-constraints.dto';
import { ConstraintsService } from './constraints.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Constraints')
@Controller('constraints')
export class ConstraintsController {
  constructor(private readonly constraintsService: ConstraintsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a constraints' })
  @Post()
  create(@Body() createConstraintsDto: CreateConstraintsDto) {
    return this.constraintsService.create(createConstraintsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all constraints' })
  @Get()
  findAll() {
    return this.constraintsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get constraints' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.constraintsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update constraints' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConstraintsDto: UpdateConstraintsDto,
  ) {
    return await this.constraintsService.update(+id, updateConstraintsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete constraints' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.constraintsService.delete(id);
  }
}
