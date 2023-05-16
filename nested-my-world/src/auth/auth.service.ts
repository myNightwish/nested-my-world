import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, genSalt, hash } from 'bcrypt';
import { UserEntity } from '../user/dto/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //   async validateUser(username: string, password: string): Promise<any> {
  //     const user = await this.userService.findOne(username);
  //     if (user && user.password === password) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  //   async login(user: any) {
  //     const payload = { username: user.username, sub: user.userId };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }
  // 利用 bcrypt 生成哈希密码
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  // 验证密码是否匹配
  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // 注册用户
  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await hash(createUserDto.password, 10); //用bcrypt生成哈希密码
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // 这里可以设置其他相关操作，如发送欢迎邮件等等
    return user;
  }

  //   // 验证用户登录
  //   async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
  //     const user = await this.userService.findByUsername(loginUserDto.username);
  //     const isPasswordMatching = await compare(
  //       loginUserDto.password,
  //       user.password,
  //     );
  //     if (user && isPasswordMatching) {
  //       const payload = { username: user.username, role: user.role }; // 设置JWT负载对象
  //       const access_token = this.jwtService.sign(payload); // 生成token并返回
  //       return { access_token };
  //     } else {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }
  //   }
}
