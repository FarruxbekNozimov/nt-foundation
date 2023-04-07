import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateTasksDto {
	@ApiProperty({ example: 'Two Sum' })
	title?: string;

	@ApiProperty({ example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.' })
	description?: string;

	@ApiProperty({ example: '1' })
	difficult_id?: number;

	@ApiProperty({ example: '1' })
	constraint_id?: number;

	@ApiProperty({ example: '1' })
	answer_id?: number;
}
