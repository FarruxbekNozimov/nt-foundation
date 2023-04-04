import { Tasks } from "../../tasks/models/tasks.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface TasksSampleAttr {
  input:string
	output:string
	description:string
	task_id:number
	
}

@Table({ tableName: 'tasks-sample' })
export class TasksSample extends Model<TasksSample, TasksSampleAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	input:string;

	@Column({ type: DataType.STRING })
	output:string;

	@Column({ type: DataType.STRING })
	description:string;

	@ForeignKey(() => Tasks)
	@Column({ type: DataType.INTEGER })
	task_id: number;
	@BelongsTo(() => Tasks)
	tasks: Tasks[];

	
}
