import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Otp } from '../otp/models/otp.model';
import { PhoneUserDto } from './dto/phone-user.dto';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode, decode, dates } from '../helpers/crypto';
import { Op } from 'sequelize';
import * as otpGenerator from 'otp-generator';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    @InjectModel(Otp) private otpRepo: typeof Otp,
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const res = await this.studentRepo.create(createStudentDto);
    return res;
  }

  async findAll() {
    return await this.studentRepo.findAll({
      include: { all: true, nested: true },
    });
  }

  async findOne(id: number) {
    return await this.studentRepo.findByPk(id);
  }

  async findOneByPhone(phone: string) {
    return await this.studentRepo.findOne({ where: { phone_number: phone } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepo.update(updateStudentDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    const result = await this.studentRepo.destroy({ where: { id } });
    return result;
  }

  async newOTP(phoneUserDto: PhoneUserDto) {
    try {
      const phone_number = phoneUserDto.phone_number;
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      const student = await this.studentRepo.findOne({
        where: { phone_number },
      });
      await this.otpRepo.destroy({ where: { id: student.otp_id } });

      const newOtp = await this.otpRepo.create({
        otp,
        expiration_time,
        verified: false,
        phone: phone_number,
      });
      const details = {
        timestamp: now,
        phone_number: phone_number,
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
    const check_obj = obj.phone_number;
    if (check_obj != phone_number)
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    const result = await this.otpRepo.findOne({ where: { id: obj.otp_id } });
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const user = await this.studentRepo.findOne({
              where: { phone_number: phone_number },
            });
            if (user) {
              const updatedUser = await this.studentRepo.findOne({
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
