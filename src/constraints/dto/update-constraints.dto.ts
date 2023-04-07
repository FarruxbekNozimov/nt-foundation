import { ApiProperty } from "@nestjs/swagger";

export class UpdateConstraintsDto {
	@ApiProperty({ example: '2 <= nums.length <= 104\t-109 <= nums[i] <= 109' })
  constraint?: string;
}
