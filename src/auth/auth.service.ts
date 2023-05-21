import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { UserDto } from '../user/dto/user.dto';
import {
  UnauthorizedException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDto: UserDto) {
    const user = await this.userService.findByUsername(userDto.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(userDto);
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
      const userId = this.generateUniqueUserId() + user.username;

      const payload = {
        username: user.username,
        role: user.password,
        sub: userId,
      }; // 设置JWT负载对象
      const access_token = this.jwtService.sign(payload); // 生成token并返回
      return { access_token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  // 利用 bcrypt 生成哈希密码
  async hashPassword(password: string): Promise<string> {
    // 这里可以设置其他相关操作，如发送欢迎邮件等等
    return await hash(password, 10); //用bcrypt生成哈希密码
  }

  generateUniqueUserId(): string {
    const length = 10;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
