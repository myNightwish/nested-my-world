import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthModule {}
