import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  link: string;
}
