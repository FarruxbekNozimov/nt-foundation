import { ApiProperty } from "@nestjs/swagger";

export class UpdateClassesDto {
	@ApiProperty({ example: '1' })
  student_id?: number;

	@ApiProperty({ example: '1' })
	teacher_id?: number;

	@ApiProperty({ example: 'true' })
	is_active?: boolean;	
}
