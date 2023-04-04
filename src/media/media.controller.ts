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
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaService } from './media.service';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'Create a media' })
  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'Get all media' })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'Get media' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update media' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return await this.mediaService.update(+id, updateMediaDto);
  }

  @ApiOperation({ summary: 'Delete media' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.mediaService.delete(id);
  }
}
