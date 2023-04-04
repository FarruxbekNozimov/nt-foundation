import { Task } from "../../task/models/task.model";
import { Lesson } from "../../lesson/models/lesson.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface LessonTaskAttr {
  lesson_id:number
	task_id:number
	
}

@Table({ tableName: 'lesson-task' })
export class LessonTask extends Model<LessonTask, LessonTaskAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Lesson)
	@Column({ type: DataType.INTEGER })
	lesson_id: number;
	@BelongsTo(() => Lesson)
	lesson: Lesson[];

	@ForeignKey(() => Task)
	@Column({ type: DataType.INTEGER })
	task_id: number;
	@BelongsTo(() => Task)
	task: Task[];

	
}
