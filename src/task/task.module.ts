import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtModule } from '@nestjs/jwt';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({ secret: 'maomao' }),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TaskModule {}
