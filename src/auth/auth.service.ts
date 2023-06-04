import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { Injectable } from '@nestjs/common';

import encry from 'src/utils/crypto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户登录
  async login(loginUserDto: UserDto): Promise<{ access_token: string }> {
    const { username, password } = loginUserDto;
    const user = await this.userService.findByUsername(username);
    if (user?.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.UNAUTHORIZED);
    }

    // 设置JWT负载对象
    const payload = {
      username: user.username,
      role: user.password,
      sub: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
