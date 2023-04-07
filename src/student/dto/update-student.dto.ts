import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class UpdateStudentDto {
	@ApiProperty({ example: 'Toshmat1221' })
	username?: string;

	@ApiProperty({ example: 'Toshmat' })
	first_name?: string;

	@ApiProperty({ example: 'Eshmatov' })
	last_name?: string;

	@ApiProperty({ example: '+998888012345' })
	phone_number?: string;

	@ApiProperty({ example: '+998888012345' })
	phone_number_alter?: string;

	@ApiProperty({ example: 'Uzb@k!$t0n' })
	password?: string;

	@ApiProperty({ example: 'toshmat@gmail.com' })
	email?: string;

	@ApiProperty({ example: '2010-09-12' })
	birth_date?: string;

	@ApiProperty({ example: '1' })
	gender_id?: number;

	@ApiProperty({ example: '1' })
	otp_id?: number;

	@ApiProperty({ example: 'true/false' })
	is_active?: boolean;

	refresh_token?: string;
}
