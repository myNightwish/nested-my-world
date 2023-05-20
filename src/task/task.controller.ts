import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { TaskStatus } from './dto/task-status.enum';

@Controller('tasks')
export class TaskController {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // 新增任务
  @Post('/create')
  async createTask(@Body() task: Task, @Query('endTime') endTime: string) {
    task.endTime = new Date(endTime);
    return await this.taskRepository.save(task);
  }

  // 修改任务
  @Put('/update:id')
  async updateTask(
    @Param('id') id: number,
    @Body() task: Task,
    @Query('endTime') endTime: string,
  ) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    const newTask = { ...existingTask, ...task };
    if (endTime) {
      newTask.endTime = new Date(endTime);
    }
    return await this.taskRepository.save(newTask);
  }

  @Put(':id/setEndTime')
  async setEndTime(@Param('id') id: number, @Query('endTime') endTime: string) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    existingTask.endTime = new Date(endTime);
    return await this.taskRepository.save(existingTask);
  }

  @Put(':id/receive')
  async receiveTask(
    @Param('id') id: number,
    @Query('receiverId') receiverId: number,
  ) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    existingTask.status = TaskStatus.RECEIVED as TaskStatus;
    existingTask.receiverId = receiverId;
    return await this.taskRepository.save(existingTask);
  }

  @Put(':id/complete')
  async completeTask(@Param('id') id: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });
    existingTask.status = TaskStatus.COMPLETED as TaskStatus;
    return await this.taskRepository.save(existingTask);
  }
  // 删除任务
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskRepository.delete(id);
  }

  // 获取任务
  @Get()
  async getAllTasks() {
    return await this.taskRepository.find();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    return await this.taskRepository.findOne({
      where: { id: id },
    });
  }
}
