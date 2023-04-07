import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTasksDto {
	@ApiProperty({ example: 'Two Sum' })
	@IsNotEmpty()
	title: string;
	
	@ApiProperty({ example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.' })
	@IsNotEmpty()
	description: string;
	
	@ApiProperty({ example: '1' })
	@IsNotEmpty()
	difficult_id: number;
	
	@ApiProperty({ example: '1' })
	@IsNotEmpty()
	constraint_id: number;
	
	@ApiProperty({ example: '1' })
	@IsNotEmpty()
	answer_id: number;
}
