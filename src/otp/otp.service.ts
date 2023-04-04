import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp) private otpRepo: typeof Otp) { }

  async create(createOtpDto: CreateOtpDto) {
    const res = await this.otpRepo.create(createOtpDto);
    return res;
  }

  async findAll() {
    return await this.otpRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.otpRepo.findByPk(id);
  }

  async update(id: number, updateOtpDto: UpdateOtpDto) {
    return await this.otpRepo.update(updateOtpDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.otpRepo.destroy({ where: { id } });
    return result;
  }
}
