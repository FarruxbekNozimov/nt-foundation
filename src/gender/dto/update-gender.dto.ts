import { ApiProperty } from "@nestjs/swagger";

export class UpdateGenderDto {
	@ApiProperty({ example: 'Male' })
  name?: string;
}
