import { ApiProperty } from "@nestjs/swagger";

export class UpdateHintsDto {
  @ApiProperty({ example: '2 ta sonni yigindisini topish' })
  description?: string;

  @ApiProperty({ example: `var twoSum = function(nums, target) {\n\t};` })
  code?: string;
}
