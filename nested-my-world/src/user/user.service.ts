import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './dto/user.entity';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username });
  }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = userDto.username;
    user.password = await this.authService.hashPassword(userDto.password);
    return await this.userRepository.save(user);
  }
}
