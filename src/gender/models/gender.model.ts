import { Teacher } from '../../teacher/models/teacher.model';
import { Student } from '../../student/models/student.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface GenderAttr {
  name:string
	
}

@Table({ tableName: 'gender' })
export class Gender extends Model<Gender, GenderAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Teacher)
	teacher: Teacher[];

	@HasMany(() => Student)
	student: Student[];

	
}
