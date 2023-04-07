import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLessonDto {
	@ApiProperty({ example: '1' })
	@IsString()
	unit: number;

	@ApiProperty({ example: 'Shart operatorlari' })
	@IsString()
	theme: string;

	@ApiProperty({ example: 'Shart operatorlariga: +, -, /, * kabilar kiradi.... ' })
	@IsString()
	description: string;

	@ApiProperty({ example: '1' })
	@IsString()
	video_id: number;

	@ApiProperty({ example: '1' })
	@IsString()
	file_id: number;

	@ApiProperty({ example: '17:00' })
	@IsString()
	end_time: Date;
	
}
