import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class CreateAdminDto {
	@ApiProperty({ example: 'adminjon1' })
	@IsString()
  username: string;

	@ApiProperty({ example: '+998771231212' })
	@IsPhoneNumber()
	phone: string;
	
	@ApiProperty({ example: 'adminjon1' })
	@IsString()
	password: string;
	
	@ApiProperty({ example: 'admin1@gmail.com' })
	@IsString()
	email: string;
}
