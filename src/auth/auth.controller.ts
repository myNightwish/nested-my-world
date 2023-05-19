import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() userDto: UserDto) {
    console.log('username--', userDto, userDto.username);
    return this.authService.registerUser(userDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: UserDto) {
    return this.authService.login(loginUserDto);
  }
  // 已完成：用户创建、用户身份存储、用户登录功能
  // TODO：用户密码重置
}
