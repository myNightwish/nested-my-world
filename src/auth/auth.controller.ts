import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { Public } from 'src/public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('wechat')
  // @UseGuards(AuthGuard('wechat'))
  // async weChatLogin() {
  //   // 该路由用于发起微信登录请求，重定向至微信扫码页面
  //   console.log('跳转微信扫码枪等x callback');
  // }

  // @Get('wechat/callback')
  // @UseGuards(AuthGuard('wechat'))
  // async weChatCallback(@Req() req: any, @Res() res: any) {
  //   console.log('safsdf');

  //   // 微信扫码登录回调处理
  //   const user = req.user; // 获取已验证的用户信息
  //   const token = this.authService.generateToken(user); // 根据用户信息生成令牌
  //   // 重定向到前端页面，携带登录凭证等信息
  //   return res.redirect(`YOUR_FRONTEND_REDIRECT_URL?token=${token}`);
  // }

  @Public()
  @Post('/login')
  async login(@Body() loginUserDto: UserDto) {
    return this.authService.login(loginUserDto);
  }
  // TODO：用户密码重置

  @Public()
  @Post('/test')
  test() {
    console.log('测试专用');
    return 1;
  }
}
