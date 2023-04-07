import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAnswerDto {
	@ApiProperty({ example: '2 ta sonni yigindisini topish' })
	@IsString()
	description: string;

	@ApiProperty({ example: `var twoSum = function(nums, target) {\n\t};` })
	@IsString()
	code: string;

	@ApiProperty({ example: '1' })
	@IsString()
  task_id: number;

	@ApiProperty({ example: '1' })
	@IsString()
  student_id: number;
}
