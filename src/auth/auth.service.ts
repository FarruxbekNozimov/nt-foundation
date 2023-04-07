import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StudentService } from '../student/student.service';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode, decode, dates } from '../helpers/crypto';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from '../otp/models/otp.model';
import { Teacher } from '../teacher/models/teacher.model';
import { Admin } from '../admin/models/admin.model';
import { AdminService } from '../admin/admin.service';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Otp) private otpRepo: typeof Otp,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) { }

  async admin_login(loginDto: LoginDto, res: Response) {
    const { username, password } = loginDto;
    const user = await this.adminService.findOneByUsername(username);
    if (!user)
      throw new HttpException(
        `Bunday admin mavjud emas`,
        HttpStatus.BAD_REQUEST,
      );
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.adminService.update(user.id, {
      ...user,
      refresh_token: hashed_refresh_token,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'ADMIN LOGGED',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async admin_refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('admin not found');
    }
    const admin = await this.studentService.findOne(user_id);
    if (!admin || !admin.password) {
      throw new BadRequestException('admin not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!tokenMatch) {
      throw new BadRequestException('Buzib ko`rishga urinmoqchimisiz 😒');
    }
    const tokens = await this.getToken(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.studentService.update(admin.id, {
      refresh_token: hashed_refresh_token,
    });
    return updatedUser
  }

  async getToken(user: any) {
    const payload = { id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async teacher_refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.teacherService.findOne(user_id);
    if (!user || !user.password) {
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!tokenMatch) {
      throw new BadRequestException('Buzib ko`rishga urinmoqchimisiz');
    }
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.teacherService.update(user.id, {
      refresh_token: hashed_refresh_token,
    });
    return updatedUser
  }

  async teacher_newOTP(phoneUserDto: PhoneUserDto) {
    try {
      const user = await this.teacherService.findOneByPhone(phoneUserDto.phone_number);
      if (!user) {
        throw new NotFoundException('Bunday foydalanuvchi yo`q');
      }
      const phone = phoneUserDto.phone_number;
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      const teacher = await this.teacherService.findOneByPhone(phone);
      if (teacher) {
        await this.otpRepo.destroy({ where: { id: teacher.otp_id } });
      }

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
      console.log(error);
      return { status: 'Error', message: 'Otp yozishda xatolik !!!' };
    }
  }

  async teacher_verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const user = await this.teacherService.findOneByPhone(verifyOtpDto.phone_number);
    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi yo`q');
    }
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
            const user = await this.teacherService.findOneByPhone(phone_number);
            await this.otpRepo.update(
              { verified: true },
              { where: { id: obj.otp_id }, returning: true },
            );
            if (user) {
              const tokens = await this.getToken(user);
              const hashed_refresh_token = await bcrypt.hash(
                tokens.refresh_token,
                7,
              );

              const updatedUser = await this.teacherService.update(user.id,
                {
                  ...user,
                  refresh_token: hashed_refresh_token,
                });
              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
              });
              return {
                status: 200,
                isUser: true,
                message: 'User login success',
              };
            } else {
              return {
                status: 200,
                isUser: false,
                message: 'User login failed successfuly. ',
              };
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

  async student_newOTP(phoneUserDto: PhoneUserDto) {
    try {
      const user = await this.studentService.findOneByPhone(phoneUserDto.phone_number);
      if (!user) {
        throw new NotFoundException('Bunday foydalanuvchi yo`q');
      }
      const phone = phoneUserDto.phone_number;
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      const teacher = await this.studentService.findOneByPhone(phone);
      if (teacher) {
        await this.otpRepo.destroy({ where: { id: teacher.otp_id } });
      }

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
      console.log(error);
      return { status: 'Error', message: 'Otp yozishda xatolik !!!' };
    }
  }

  async student_verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const user = await this.studentService.findOneByPhone(verifyOtpDto.phone_number);
    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi yo`q');
    }
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
            const user = await this.studentService.findOneByPhone(phone_number);
            await this.otpRepo.update(
              { verified: true },
              { where: { id: obj.otp_id }, returning: true },
            );
            if (user) {
              const tokens = await this.getToken(user);
              const hashed_refresh_token = await bcrypt.hash(
                tokens.refresh_token,
                7,
              );

              const updatedUser = await this.studentService.update(user.id,
                {
                  ...user,
                  refresh_token: hashed_refresh_token,
                });
              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
              });
              return {
                status: 200,
                isUser: true,
                message: 'User login success',
              };
            } else {
              return {
                status: 200,
                isUser: false,
                message: 'User login failed successfuly. ',
              };
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

  async student_refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.studentService.findOne(user_id);
    if (!user || !user.password) {
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!tokenMatch) {
      throw new BadRequestException('Buzib ko`rishga urinmoqchimisiz');
    }
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.studentService.update(user.id, {
      refresh_token: hashed_refresh_token,
    });
    return updatedUser
  }
}
