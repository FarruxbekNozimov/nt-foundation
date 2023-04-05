import { Message } from '../../message/models/message.model';
import { Teacher } from "../../teacher/models/teacher.model";
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

interface ClassesAttr {
  student_id:number
	teacher_id:number
	is_active:boolean
	
}

@Table({ tableName: 'classes' })
export class Classes extends Model<Classes, ClassesAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Student)
	@Column({ type: DataType.INTEGER })
	student_id: number;
	@BelongsTo(() => Student)
	student: Student[];

	@ForeignKey(() => Teacher)
	@Column({ type: DataType.INTEGER })
	teacher_id: number;
	@BelongsTo(() => Teacher)
	teacher: Teacher[];

	@Column({ type: DataType.BOOLEAN })
	is_active:boolean;

	@HasMany(() => Message)
	message: Message[];

	
}
