import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './dto/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<UserEntity | string> {
    const { username } = userDto;
    const existUser = await this.findIsExist(username);
    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);

    try {
      const newUser = await this.userRepository.create(userDto);
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new ApiException(
        '用户创建服务失败',
        ApiErrorCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findIsExist(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.findIsExist(username);

    if (!user)
      throw new ApiException('用户不存在', ApiErrorCode.INTERNAL_SERVER_ERROR);
    return user;
  }
}
