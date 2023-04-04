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

interface RatingAttr {
  student_id:number
	stars:number
	
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Student)
	@Column({ type: DataType.INTEGER })
	student_id: number;
	@BelongsTo(() => Student)
	student: Student[];

	@Column({ type: DataType.INTEGER })
	stars:number;

	
}
