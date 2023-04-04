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
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpService } from './otp.service';

@ApiTags('Otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Create a otp' })
  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @ApiOperation({ summary: 'Get all otp' })
  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @ApiOperation({ summary: 'Get otp' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.otpService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update otp' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOtpDto: UpdateOtpDto,
  ) {
    return await this.otpService.update(+id, updateOtpDto);
  }

  @ApiOperation({ summary: 'Delete otp' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.otpService.delete(id);
  }
}
