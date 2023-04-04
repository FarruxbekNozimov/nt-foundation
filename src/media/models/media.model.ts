import { Message } from '../../message/models/message.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface MediaAttr {
  link:string
	private:boolean
	
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, MediaAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	link:string;

	@Column({ type: DataType.BOOLEAN })
	private:boolean;

	@HasMany(() => Message)
	message: Message[];

	
}
