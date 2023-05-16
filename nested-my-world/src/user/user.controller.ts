import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    const user = await this.userService.findByUsername(userDto.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(userDto);
  }
}
