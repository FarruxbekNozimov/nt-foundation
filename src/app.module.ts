import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { AnswerModule } from './answer/answer.module';
import { ConstraintsModule } from './constraints/constraints.module';
import { DifficultModule } from './difficult/difficult.module';
import { FileModule } from './file/file.module';
import { GenderModule } from './gender/gender.module';
import { HintsModule } from './hints/hints.module';
import { LessonModule } from './lesson/lesson.module';
import { LessonTaskModule } from './lesson-task/lesson-task.module';
import { MediaModule } from './media/media.module';
import { MessageModule } from './message/message.module';
import { OtpModule } from './otp/otp.module';
import { RatingModule } from './rating/rating.module';
import { StudentModule } from './student/student.module';
import { TasksModule } from './tasks/tasks.module';
import { TasksSampleModule } from './tasks-sample/tasks-sample.module';
import { TeacherModule } from './teacher/teacher.module';
import { VideoModule } from './video/video.module';
import { Admin } from './admin/models/admin.model';
import { Answer } from './answer/models/answer.model';
import { Constraints } from './constraints/models/constraints.model';
import { Difficult } from './difficult/models/difficult.model';
import { Gender } from './gender/models/gender.model';
import { Hints } from './hints/models/hints.model';
import { LessonTask } from './lesson-task/models/lesson-task.model';
import { Lesson } from './lesson/models/lesson.model';
import { Media } from './media/models/media.model';
import { Message } from './message/models/message.model';
import { Otp } from './otp/models/otp.model';
import { Rating } from './rating/models/rating.model';
import { Student } from './student/models/student.model';
import { TasksSample } from './tasks-sample/models/tasks-sample.model';
import { Tasks } from './tasks/models/tasks.model';
import { Teacher } from './teacher/models/teacher.model';
import { Video } from './video/models/video.model';
import { File } from './file/models/file.model';
import { ClassesModule } from './classes/classes.module';
import { Classes } from './classes/models/classes.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Answer,
        Constraints,
        Difficult,
        File,
        Gender,
        Hints,
        Lesson,
        LessonTask,
        Media,
        Message,
        Otp,
        Rating,
        Student,
        Tasks,
        TasksSample,
        Teacher,
        Video,
        Classes,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AuthModule,
    AdminModule,
    AnswerModule,
    ConstraintsModule,
    DifficultModule,
    FileModule,
    GenderModule,
    HintsModule,
    LessonModule,
    LessonTaskModule,
    MediaModule,
    MessageModule,
    OtpModule,
    RatingModule,
    StudentModule,
    TasksModule,
    TasksSampleModule,
    TeacherModule,
    VideoModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
