import { ApiProperty } from "@nestjs/swagger";
import {  IsPhoneNumber, IsString } from "class-validator";

export class CreateStudentDto {
	@ApiProperty({ example: 'Toshmat1221' })
	@IsString()
	username: string;

	@ApiProperty({ example: 'Toshmat' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'Eshmatov' })
	@IsString()
	last_name: string;

	@ApiProperty({ example: '+998888012345' })
	@IsPhoneNumber()
	phone_number: string;

	@ApiProperty({ example: '+998888012345' })
	@IsString()
	phone_number_alter: string;

	@ApiProperty({ example: 'Uzb@k!$t0n' })
	@IsString()
	password: string;

	@ApiProperty({ example: 'toshmat@gmail.com' })
	@IsString()
	email: string;

	@ApiProperty({ example: '2010-09-12' })
	@IsString()
	birth_date: string;

	@ApiProperty({ example: '1' })
	gender_id: number;
}
