import { ApiProperty } from "@nestjs/swagger";

export class CreateClassesDto {
	@ApiProperty({ example: '1' })
  student_id: number;

	@ApiProperty({ example: '1' })
	teacher_id: number;	
}
