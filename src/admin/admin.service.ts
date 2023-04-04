import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) { }

  async create(createAdminDto: CreateAdminDto) {
    const res = await this.adminRepo.create(createAdminDto);
    return res;
  }

  async findAll() {
    return await this.adminRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.adminRepo.destroy({ where: { id } });
    return result;
  }
}
