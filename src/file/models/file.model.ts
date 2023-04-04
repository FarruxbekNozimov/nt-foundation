import { Lesson } from '../../lesson/models/lesson.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface FileAttr {
  title:string
	link:string
	private:boolean
	
}

@Table({ tableName: 'file' })
export class File extends Model<File, FileAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	title:string;

	@Column({ type: DataType.STRING })
	link:string;

	@Column({ type: DataType.BOOLEAN })
	private:boolean;

	@HasMany(() => Lesson)
	lesson: Lesson[];

	
}
