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

interface ConstraintsAttr {
  constraint:string
	
}

@Table({ tableName: 'constraints' })
export class Constraints extends Model<Constraints, ConstraintsAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	constraint:string;

	@HasMany(() => Tasks)
	tasks: Tasks[];
}
