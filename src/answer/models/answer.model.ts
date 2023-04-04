import { Tasks } from '../../tasks/models/tasks.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface AnswerAttr {
  description:string
	code:string
	
}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	description:string;

	@Column({ type: DataType.STRING })
	code:string;

	@HasMany(() => Tasks)
	tasks: Tasks[];

	
}
