import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StudentService } from '../student/student.service';
import { CreateStudentDto } from '../student/dto/create-student.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto, res: Response) {
    const { phone, password } = loginDto;
    const user = await this.studentService.findOneByPhone(phone);
    if (!user)
      throw new HttpException(`Bunday o'quvchi mavjud emas`, HttpStatus.BAD_REQUEST);
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      throw new UnauthorizedException(`Xato kiritdingiz`);
    }
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.studentService.update(user.id, {
      ...user, refresh_token: hashed_refresh_token,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'USER LOGIN',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  private async getToken(user: any) {
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

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.studentService.findOne(user_id);
    if (!user || !user.password) {
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.password);
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.studentService.update(user.id, {
      refresh_token: hashed_refresh_token,
    });
  }
}
