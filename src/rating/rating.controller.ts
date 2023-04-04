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
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Create a rating' })
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @ApiOperation({ summary: 'Get all rating' })
  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @ApiOperation({ summary: 'Get rating' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ratingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update rating' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return await this.ratingService.update(+id, updateRatingDto);
  }

  @ApiOperation({ summary: 'Delete rating' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.ratingService.delete(id);
  }
}
