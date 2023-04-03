import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { Example } from './models/example.model';

@Module({
  imports: [SequelizeModule.forFeature([Example]), JwtModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
