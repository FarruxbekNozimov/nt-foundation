import { ApiProperty } from '@nestjs/swagger';
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
import { Student } from '../../student/models/student.model';

interface AnswerAttr {
  description: string
  code: string

}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Mana bu.....' })
  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  code: string;

  @ForeignKey(() => Tasks)
  @Column({ type: DataType.INTEGER })
  task_id: number;
  @BelongsTo(() => Tasks)
  task: Tasks[];

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  student_id: number;
  @BelongsTo(() => Student)
  student: Student[];
}
