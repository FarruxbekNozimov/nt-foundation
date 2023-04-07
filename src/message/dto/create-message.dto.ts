import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageDto {
	@ApiProperty({ example: 'Salom Toshmat qaleysan' })
	@IsString()
  text: string;

	@ApiProperty({ example: '1' })
	user_id: number;

	@ApiProperty({ example: '1' })
	media_id: number;

	@ApiProperty({ example: '1' })
	reply_to: number;

	@ApiProperty({ example: '1' })
	@IsString()
	classes_id: number;	
}
