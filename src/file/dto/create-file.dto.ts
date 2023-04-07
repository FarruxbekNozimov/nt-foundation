import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFileDto {
	@ApiProperty({ example: 'shart operatori' })
	@IsString()
	title: string;

	@ApiProperty({ example: 'file1702.jpg' })
	@IsString()
	link: string;
}
