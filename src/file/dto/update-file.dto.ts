import { ApiProperty } from "@nestjs/swagger";

export class UpdateFileDto {
	@ApiProperty({ example: 'shart operatori' })
	title?: string;
	
	@ApiProperty({ example: 'file1702.jpg' })
	link?: string;
}
