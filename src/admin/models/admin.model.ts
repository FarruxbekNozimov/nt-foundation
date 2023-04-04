import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface AdminAttr {
  username:string
	phone:string
	password:string
	email:string
	is_active:boolean
	refresh_token:string
	
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	username:string;

	@Column({ type: DataType.STRING })
	phone:string;

	@Column({ type: DataType.STRING })
	password:string;

	@Column({ type: DataType.STRING })
	email:string;

	@Column({ type: DataType.BOOLEAN })
	is_active:boolean;

	@Column({ type: DataType.STRING })
	refresh_token:string;

	
}
