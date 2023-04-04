import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface OtpAttr {
  otp:string
	expiration_time:Date
	verified:boolean
	
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	otp:string;

	@Column({ type: DataType.DATE })
	expiration_time:Date;

	@Column({ type: DataType.BOOLEAN })
	verified:boolean;

	
}
