import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserEntity } from './dto/user.entity';
import { UserService } from './user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../share/guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    JwtService,
    JwtStrategy, // JWT 认证策略
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
