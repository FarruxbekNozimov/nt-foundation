import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface VideoAttr {
  link:string
	private:boolean
	
}

@Table({ tableName: 'video' })
export class Video extends Model<Video, VideoAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	link:string;

	@Column({ type: DataType.BOOLEAN })
	private:boolean;

	
}
