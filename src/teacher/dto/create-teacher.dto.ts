import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class CreateTeacherDto {
	@ApiProperty({ example: 'AbduraimOka1' })
	@IsString()
  username: string;

	@ApiProperty({ example: 'Abduraim' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'Aliov' })
	@IsString()
	last_name: string;

	@ApiProperty({ example: '+998121231212' })
	@IsPhoneNumber()
	phone: string;

	@ApiProperty({ example: 'T0$hk@ntiston' })
	password: string;

	@ApiProperty({ example: 'adbruraim@gmail.com' })
	email?: string;

	@ApiProperty({ example: '2010-03-04' })
	birth_date: string;

	@ApiProperty({ example: '1' })
	gender_id: number;
}
