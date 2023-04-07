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
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoService } from './video.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a video' })
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all video' })
  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get video' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.videoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update video' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return await this.videoService.update(+id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete video' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.videoService.delete(id);
  }
}
