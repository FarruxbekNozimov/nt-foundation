import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AdminAuthGuard } from '../guards/admin-auth.guards';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a admin' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    try {
      return this.adminService.create(createAdminDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Create a admin',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all admin' })
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get admin' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update admin' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete admin' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.adminService.delete(id);
  }
}
