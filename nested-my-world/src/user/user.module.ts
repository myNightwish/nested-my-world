// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserEntity } from './dto/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
