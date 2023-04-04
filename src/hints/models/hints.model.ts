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

interface HintsAttr {
  description:string
	code:string
	
}

@Table({ tableName: 'hints' })
export class Hints extends Model<Hints, HintsAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	description:string;

	@Column({ type: DataType.STRING })
	code:string;

	@HasMany(() => Tasks)
	tasks: Tasks[];

	
}
