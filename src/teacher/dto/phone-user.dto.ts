import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneUserDto {
  @ApiProperty({ example: '+998887038006' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;
}
