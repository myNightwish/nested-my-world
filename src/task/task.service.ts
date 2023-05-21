import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { TaskStatus } from './dto/task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async receiveTask(id: number, receiverId: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    existingTask.status = TaskStatus.RECEIVED as TaskStatus;
    existingTask.receiverId = receiverId;
    return await this.taskRepository.save(existingTask);
  }

  async completeTask(id: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    existingTask.status = TaskStatus.COMPLETED as TaskStatus;
    return await this.taskRepository.save(existingTask);
  }

  async findTask(options: { [key: string]: any }): Promise<Task[]> {
    return this.taskRepository.find(options);
  }

  generateUniqueTaskId(): string {
    const length = 10;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
