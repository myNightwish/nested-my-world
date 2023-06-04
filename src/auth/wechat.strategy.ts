import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-wechat';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class WeChatStrategy extends PassportStrategy(Strategy, 'wechat') {
  constructor() {
    super({
      clientID: 'wxdaf83a61aa973ca1',
      appID: 'wxdaf83a61aa973ca1',
      appSecret: 'd67dc8009a3ef02bfc635884538ed3be',
      callbackURL: '/auth/login',
      // TODO；配置 scope
      scope: 'snsapi_login',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 在这里可以根据微信用户信息进行用户登录处理
    // 可以调用 AuthService 的方法来创建或更新用户账户
    const user = await this.authService.createOrUpdateUser(profile);
    return user;
  }
}
