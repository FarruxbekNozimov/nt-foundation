import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {
	@ApiProperty({ example: 'Male' })
	@IsString()
  name: string;
}
