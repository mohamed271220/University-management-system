import { Module } from '@nestjs/common';
import { HallService } from './hall.service';
import { HallController } from './hall.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Hall } from './hall.entity';
import { Department } from 'src/department/department.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Hall, Department, Lecture]),
    AuthModule,
  ],
  providers: [HallService],
  controllers: [HallController],
})
export class HallModule {}
