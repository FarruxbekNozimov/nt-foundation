import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './models/file.model';

@Module({
  imports: [SequelizeModule.forFeature([File]), JwtModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
