import { Classes } from '../../classes/models/classes.model';
import { Otp } from "../../otp/models/otp.model";
import { Gender } from "../../gender/models/gender.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface StudentAttr {
  username:string
	first_name:string
	last_name:string
	phone_number:string
	phone_number_alter:string
	password:string
	email:string
	birth_date:string
	gender_id:number
	otp_id:number
	is_active:boolean
	refresh_token:string
	
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
	username:string;

	@Column({ type: DataType.STRING })
	first_name:string;

	@Column({ type: DataType.STRING })
	last_name:string;

	@Column({ type: DataType.STRING })
	phone_number:string;

	@Column({ type: DataType.STRING })
	phone_number_alter:string;

	@Column({ type: DataType.STRING })
	password:string;

	@Column({ type: DataType.STRING })
	email:string;

	@Column({ type: DataType.STRING })
	birth_date:string;

	@ForeignKey(() => Gender)
	@Column({ type: DataType.INTEGER })
	gender_id: number;
	@BelongsTo(() => Gender)
	gender: Gender[];

	@ForeignKey(() => Otp)
	@Column({ type: DataType.INTEGER })
	otp_id: number;
	@BelongsTo(() => Otp)
	otp: Otp[];

	@Column({ type: DataType.BOOLEAN })
	is_active:boolean;

	@Column({ type: DataType.STRING })
	refresh_token:string;

	@HasMany(() => Classes)
	classes: Classes[];

	
}
