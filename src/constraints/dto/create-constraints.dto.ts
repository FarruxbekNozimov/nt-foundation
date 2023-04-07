import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateConstraintsDto {
	@ApiProperty({ example: '2 <= nums.length <= 104\t-109 <= nums[i] <= 109' })
	@IsString()
  constraint: string;	
}
