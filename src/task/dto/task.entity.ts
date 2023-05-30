import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  creator: string;

  @Column()
  taskId: string;

  @Column({ charset: 'utf8mb4', nullable: false })
  title: string;

  @Column({ charset: 'utf8mb4' })
  type: string;

  @Column({ charset: 'utf8mb4' })
  description: string;

  // 使用String类型的列来存储枚举类型的任务状态值
  @Column({ type: 'varchar', nullable: false, default: TaskStatus.CREATED })
  status: string;

  @Column({ charset: 'utf8mb4' })
  startLocation: string;

  @Column({ charset: 'utf8mb4' })
  endLocation: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  deadline: Date;

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

  @DeleteDateColumn()
  softDelete: Date;
}
