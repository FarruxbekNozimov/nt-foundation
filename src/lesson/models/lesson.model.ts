import { LessonTask } from '../../lesson-task/models/lesson-task.model';
import { File } from "../../file/models/file.model";
import { Video } from "../../video/models/video.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface LessonAttr {
  unit:number
	theme:string
	description:string
	video_id:number
	file_id:number
	end_time:Date
	
}

@Table({ tableName: 'lesson' })
export class Lesson extends Model<Lesson, LessonAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
	unit:number;

	@Column({ type: DataType.STRING })
	theme:string;

	@Column({ type: DataType.STRING })
	description:string;

	@ForeignKey(() => Video)
	@Column({ type: DataType.INTEGER })
	video_id: number;
	@BelongsTo(() => Video)
	video: Video[];

	@ForeignKey(() => File)
	@Column({ type: DataType.INTEGER })
	file_id: number;
	@BelongsTo(() => File)
	file: File[];

	@Column({ type: DataType.DATE })
	end_time:Date;

	@HasMany(() => LessonTask)
	lesson_task: LessonTask[];

	
}
