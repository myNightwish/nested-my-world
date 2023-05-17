import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/login')
  async login(@Body() loginUserDto: UserDto) {
    return this.authService.login(loginUserDto);
  }

  // 已完成：用户创建、用户身份存储、用户登录功能
  // TODO：用户密码重置

  // @UseGuards(AuthGuard('jwt'))
  // @Get('users')
  // async getUser(@Request() req) {
  //   return {
  //     message: 'You have access to this resource!',
  //   };
  // }
}
