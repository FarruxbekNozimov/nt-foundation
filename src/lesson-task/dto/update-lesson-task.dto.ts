import { ApiProperty } from "@nestjs/swagger";

export class UpdateLessonTaskDto {
  @ApiProperty({ example: '1' })
  lesson_id?: number;

  @ApiProperty({ example: '1' })
  task_id?: number;
}
