import { ApiProperty } from "@nestjs/swagger";

export class UpdateDifficultDto {
	@ApiProperty({ example: 'Easy' })
  name?: string;
}
