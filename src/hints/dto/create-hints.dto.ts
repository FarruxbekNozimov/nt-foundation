import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHintsDto {
  @ApiProperty({ example: '2 ta sonni yigindisini topish' })
  @IsString()
  description: string;

	@ApiProperty({ example: `var twoSum = function(nums, target) {\n\t};` })
	@IsString()
  code: string;
}
