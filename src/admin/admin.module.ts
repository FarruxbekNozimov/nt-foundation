import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './models/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule, AdminModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
