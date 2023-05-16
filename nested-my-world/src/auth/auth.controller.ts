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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body) {
    const { username, password } = body;
    return this.authService.register(username, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getUser(@Request() req) {
    return {
      message: 'You have access to this resource!',
    };
  }
}
