import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
	@ApiProperty({ example: '+998(77)-803-80-06' })
	@IsEmail()
	readonly phone_number: string;

	@ApiProperty({ example: 'Uzb@k!$t0n' })
	@IsString()
	readonly password: string;
}
