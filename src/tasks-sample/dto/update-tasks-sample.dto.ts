import { ApiProperty } from "@nestjs/swagger";

export class UpdateTasksSampleDto {
	@ApiProperty({ example: 'nums = [2,7,11,15], target = 9' })
	input?: string;
	
	@ApiProperty({ example: '[0,1]' })
	output?: string;
	
	@ApiProperty({ example: 'Because nums[0] + nums[1] == 9, we return [0, 1].' })
	description?: string;
	
	@ApiProperty({ example: '1' })
	task_id?: number;
}
