import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode, decode, dates } from '../helpers/crypto';
import { PhoneUserDto } from '../student/dto/phone-user.dto';
import { VerifyOtpDto } from '../student/dto/verifyOtp.dto';
import { Otp } from '../otp/models/otp.model';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher) private teacherRepo: typeof Teacher,
    @InjectModel(Otp) private otpRepo: typeof Otp,
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const res = await this.teacherRepo.create(createTeacherDto);
    return res;
  }

  async findAll() {
    return await this.teacherRepo.findAll({ include: { all: true, nested: true } });
  }

  async findOne(id: number) {
    return await this.teacherRepo.findByPk(id);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return await this.teacherRepo.update(updateTeacherDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.teacherRepo.destroy({ where: { id } });
    return result;
  }


  async newOTP(phoneUserDto: PhoneUserDto) {
    try {
      const phone = phoneUserDto.phone_number;
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      const student = await this.teacherRepo.findOne({
        where: { phone },
      });
      await this.otpRepo.destroy({ where: { id: student.otp_id } });

      const newOtp = await this.otpRepo.create({
        otp,
        expiration_time,
        verified: false,
        phone: phone,
      });
      const details = {
        timestamp: now,
        phone: phone,
        success: true,
        message: 'OTP sent to user',
        otp_id: newOtp.id,
      };
      const encoded = await encode(JSON.stringify(details));
      return { status: 'Success', Details: encoded };
    } catch (error) {
      return { status: 'Error', message: 'Otp yozishda xatolik !!!' };
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.phone;
    if (check_obj != phone_number)
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    const result = await this.otpRepo.findOne({ where: { id: obj.otp_id } });
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const user = await this.teacherRepo.findOne({
              where: { phone: phone },
            });
            if (user) {
              const updatedUser = await this.teacherRepo.findOne({
                where: { id: user.id },
              });
              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true },
              );
              if (!updatedUser[0]) {
                return {
                  status: 200,
                  isUser: false,
                  message: "User login failed successfuly. "
                };
              } else {
                return {
                  status: 200,
                  isUser: true,
                  message: "User login success"
                };
              }
            }
          } else {
            throw new BadRequestException('Otp is not match');
          }
        } else {
          throw new BadRequestException('Otp expired');
        }
      } else {
        throw new BadRequestException('Otp already used');
      }
    } else {
      throw new BadRequestException('Bunday foydalanuvchi yo`q');
    }
  }
}
