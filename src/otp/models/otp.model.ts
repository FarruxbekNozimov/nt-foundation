import { Teacher } from '../../teacher/models/teacher.model';
import { Student } from '../../student/models/student.model';
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
  otp: string
  expiration_time: Date
  verified: boolean
  phone:string
} 

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  otp: string;

  @Column({ type: DataType.DATE })
  expiration_time: Date;

  @Column({ type: DataType.BOOLEAN })
  verified: boolean;

  @Column({ type: DataType.STRING })
  phone: string;

  @HasMany(() => Teacher)
  teacher: Teacher[];

  @HasMany(() => Student)
  student: Student[];
}
