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

interface DifficultAttr {
  name:string
	
}

@Table({ tableName: 'difficult' })
export class Difficult extends Model<Difficult, DifficultAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	name:string;

	@HasMany(() => Tasks)
	tasks: Tasks[];

	
}
