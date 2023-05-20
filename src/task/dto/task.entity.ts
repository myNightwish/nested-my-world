import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: 'utf8mb4' })
  title: string;

  @Column({ charset: 'utf8mb4' })
  description: string;

  @Column({ charset: 'utf8mb4' })
  type: string;

  // 使用String类型的列来存储枚举类型的任务状态值
  @Column({ type: 'varchar', nullable: false, default: TaskStatus.CREATED })
  status: string;

  @Column({ charset: 'utf8mb4' })
  startLocation: string;

  @Column({ charset: 'utf8mb4' })
  endLocation: string;

  @Column()
  price: number;

  @Column()
  publisherId: number;

  @Column({ nullable: true })
  receiverId: number;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
