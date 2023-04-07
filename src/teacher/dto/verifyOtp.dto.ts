import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
	@ApiProperty({ example: '+998887038006' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

	@ApiProperty({ example: 'ifAjuf8q5auJb1G1QRTAlH9HKpqjAVSBM7Y5YXZVb6GFIz17olua+6tiLKhRPdGjXRzwx9AtB8MAtucBprG62tUr2kHSblxEX0W4VS2lUYnVEuNZ/FZID7GC1Uo6ZH33rc5HXRZVXWjufG1zrBUJckWiFxkH6MXec4JwxyGrtw4=' })
  @IsString()
  @IsNotEmpty()
  verification_key: string;

	@ApiProperty({ example: '1207' })
  @IsNumberString()
  otp: string;
}
