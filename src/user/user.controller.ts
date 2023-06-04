import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from 'src/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/register')
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }
}
