import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
  @ApiProperty({ example: '1' })
  student_id: number;

  @ApiProperty({ example: '17' })
  stars: number;
}
