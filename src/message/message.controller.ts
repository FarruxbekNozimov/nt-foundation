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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Create a message' })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @ApiOperation({ summary: 'Get all message' })
  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @ApiOperation({ summary: 'Get message' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update message' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.update(+id, updateMessageDto);
  }

  @ApiOperation({ summary: 'Delete message' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.messageService.delete(id);
  }
}
