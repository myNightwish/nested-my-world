import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import encry from '../../utils/crypto';
import * as crypto from 'crypto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  salt: string;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
