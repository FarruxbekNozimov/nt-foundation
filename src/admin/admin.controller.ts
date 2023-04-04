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
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a admin' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all admin' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.adminService.delete(id);
  }
}
