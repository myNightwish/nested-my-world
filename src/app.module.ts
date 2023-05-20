import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { env } from '../config/index';

@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
