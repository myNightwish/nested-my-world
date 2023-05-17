import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import {
  UnauthorizedException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(username: string, password: string): Promise<any> {
  //     const user = await this.userService.findOne(username);
  //     if (user && user.password === password) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  // 利用 bcrypt 生成哈希密码
  async hashPassword(password: string): Promise<string> {
    // 这里可以设置其他相关操作，如发送欢迎邮件等等
    return await hash(password, 10); //用bcrypt生成哈希密码
  }

  // 验证用户登录
  async login(loginUserDto: UserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(loginUserDto.username);
    const isPasswordMatching = await compare(
      loginUserDto.password,
      user.password,
    );
    // 验证用户密码是否匹配
    if (user && isPasswordMatching) {
      const payload = { username: user.username, role: user.password }; // 设置JWT负载对象
      const access_token = this.jwtService.sign(payload); // 生成token并返回
      return { access_token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
