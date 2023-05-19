import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class UserDto extends PartialType(
  OmitType(UserEntity, ['id', 'createdAt', 'updatedAt'] as const),
) {}
