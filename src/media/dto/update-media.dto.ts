import { ApiProperty } from "@nestjs/swagger";

export class UpdateMediaDto {
  @ApiProperty({ example: 'image.jpg' })
  link?: string;

  @ApiProperty({ example: 'false' })
	private?: boolean;
}
