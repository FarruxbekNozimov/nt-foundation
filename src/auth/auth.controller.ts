import { Controller, Post, Body, HttpCode, Res, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Login Admin' })
  @HttpCode(200)
  @Post('admin/login')
  admin_login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.admin_login(loginDto, res);
  }


  @ApiOperation({ summary: 'Refresh token for admin' })
  @Post('admin/:id/refresh')
  admin_refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.admin_refreshToken(+id, refreshToken, res);
  }


  @ApiOperation({ summary: 'New otp Teacher' })
  @HttpCode(200)
  @Post('teacher/otp')
  teacher_newOTP(@Body() phoneUserDto: PhoneUserDto) {
    return this.authService.teacher_newOTP(phoneUserDto);
  }

  @ApiOperation({ summary: 'Verify otp phone' })
  @Post('teacher/verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.teacher_verifyOtp(verifyOtpDto, res);
  }


  @ApiOperation({ summary: 'Refresh token for teacher' })
  @Post('teacher/:id/refresh')
  teacher_refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.teacher_refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'New otp Student' })
  @HttpCode(200)
  @Post('student/otp')
  student_newOTP(@Body() phoneUserDto: PhoneUserDto) {
    return this.authService.student_newOTP(phoneUserDto);
  }

  @ApiOperation({ summary: 'Student Verify otp phone' })
  @Post('student/verify')
  async student_verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.student_verifyOtp(verifyOtpDto, res);
  }

  @ApiOperation({ summary: 'Refresh token for teacher' })
  @Post('student/:id/refresh')
  student_refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.student_refreshToken(+id, refreshToken, res);
  }


}
