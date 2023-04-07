import { ApiProperty } from "@nestjs/swagger";

export class UpdateAnswerDto {
  @ApiProperty({ example: '2 ta sonni yigindisini topish' })
  description?: string;

  @ApiProperty({ example: `var twoSum = function(nums, target) {\n\t};` })
  code?: string;

  @ApiProperty({ example: '1' })
  task_id: number;

  @ApiProperty({ example: '1' })
  student_id: number;
}
