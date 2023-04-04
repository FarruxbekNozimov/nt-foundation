import { LessonTask } from '../../lesson-task/models/lesson-task.model';
import { TasksSample } from '../../tasks-sample/models/tasks-sample.model';
import { Answer } from "../../answer/models/answer.model";
import { Video } from "../../video/models/video.model";
import { Difficult } from "../../difficult/models/difficult.model";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Constraints } from '../../constraints/models/constraints.model';

interface TasksAttr {
	title: string
	description: string
	difficult_id: number
	constraint_id: number
	answer_id: number

}

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks, TasksAttr> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING })
	title: string;

	@Column({ type: DataType.STRING })
	description: string;

	@ForeignKey(() => Difficult)
	@Column({ type: DataType.INTEGER })
	difficult_id: number;
	@BelongsTo(() => Difficult)
	difficult: Difficult[];

	@ForeignKey(() => Constraints)
	@Column({ type: DataType.INTEGER })
	constraint_id: number;
	@BelongsTo(() => Constraints)
	constraint: Constraints[];

	@ForeignKey(() => Answer)
	@Column({ type: DataType.INTEGER })
	answer_id: number;
	@BelongsTo(() => Answer)
	answer: Answer[];

	@HasMany(() => LessonTask)
	lesson_task: LessonTask[];

	@HasMany(() => TasksSample)
	tasks_sample: TasksSample[];


}
