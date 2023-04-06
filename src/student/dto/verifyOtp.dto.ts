import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  verification_key: string;

  @IsNumberString()
  otp: string;
}
