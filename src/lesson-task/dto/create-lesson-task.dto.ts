import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class CreateLessonTaskDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  lesson_id: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  task_id: number;

}
