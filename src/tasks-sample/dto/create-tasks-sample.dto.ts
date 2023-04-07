import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTasksSampleDto {
	@ApiProperty({ example: 'nums = [2,7,11,15], target = 9' })
	@IsNotEmpty()
	input: string;
	
	@ApiProperty({ example: '[0,1]' })
	@IsNotEmpty()
	output: string;
	
	@ApiProperty({ example: 'Because nums[0] + nums[1] == 9, we return [0, 1].' })
	@IsNotEmpty()
	description: string;
	
	@ApiProperty({ example: '1' })
	@IsNotEmpty()
	task_id: number;
}
