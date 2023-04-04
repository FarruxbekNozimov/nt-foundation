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
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Create a file' })
  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @ApiOperation({ summary: 'Get all file' })
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @ApiOperation({ summary: 'Get file' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update file' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    return await this.fileService.update(+id, updateFileDto);
  }

  @ApiOperation({ summary: 'Delete file' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.fileService.delete(id);
  }
}
