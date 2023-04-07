import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'adminjon1' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '!adminjon1' })
  readonly password: string;
}
