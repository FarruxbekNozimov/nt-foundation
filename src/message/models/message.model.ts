import { Classes } from "../../classes/models/classes.model";
import { Media } from "../../media/models/media.model";
import { Student } from "../../student/models/student.model";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';

interface MessageAttr {
	text: string
	user_id: number
	media_id: number
	reply_to: number
	classes_id: number

}

@Table({ tableName: 'message' })
export class Message extends Model<Message, MessageAttr> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING })
	text: string;

	@ForeignKey(() => Student)
	@Column({ type: DataType.INTEGER })
	user_id: number;
	@BelongsTo(() => Student)
	student: Student[];

	@ForeignKey(() => Media)
	@Column({ type: DataType.INTEGER })
	media_id: number;
	@BelongsTo(() => Media)
	media: Media[];

	@ForeignKey(() => Message)
	@Column({ type: DataType.INTEGER })
	reply_to: number;
	@BelongsTo(() => Message)
	message: Message[];

	@ForeignKey(() => Classes)
	@Column({ type: DataType.INTEGER })
	classes_id: number;
	@BelongsTo(() => Classes)
	classes: Classes[];


}
