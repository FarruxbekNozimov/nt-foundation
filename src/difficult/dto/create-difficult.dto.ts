import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDifficultDto {
	@ApiProperty({ example: 'Easy' })
	@IsString()
  name: string;
}
