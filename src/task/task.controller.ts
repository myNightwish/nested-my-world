import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Task } from './dto/task.entity';
import { TaskStatus } from './dto/task-status.enum';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskService: TaskService,
  ) {}

  // 新增任务
  @Post('/create')
  async createTask(@Body() task: Task, @Request() req) {
    task.taskId = this.taskService.generateUniqueTaskId();
    task.creator = req.user.username;
    return await this.taskRepository.save(task);
  }

  // 修改任务
  @Put('/update')
  async updateTask(@Body() task: Task, @Request() req) {
    if (!task.taskId) {
      return '更新失败，任务ID不能为空!';
    }
    const existingTask = await this.taskRepository.findOne({
      where: { taskId: task.taskId },
    });

    if (!existingTask) {
      return '更新失败，任务不存在!';
    }
    // existingTask的创建者校验是否是当前用户
    if (existingTask.creator !== req.user.username) {
      return '更新失败，无权限修改';
    }
    // existingTask的状态校验是否是未接收
    if (
      existingTask.status === TaskStatus.RECEIVED ||
      existingTask.status == TaskStatus.COMPLETED
    ) {
      return '任务已接收，无法修改';
    }
    const newTask = { ...existingTask, ...task };
    return await this.taskRepository.save(newTask);
  }

  @Put(':id/receive')
  async receiveTask(
    @Param('id') id: number,
    @Query('receiverId') receiverId: number,
  ) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });

    if (
      existingTask.status !== TaskStatus.RECEIVED &&
      existingTask.status !== TaskStatus.FREEZED &&
      existingTask.status !== TaskStatus.COMPLETED
    ) {
      return '任务已接收，无法修改';
    }
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
  @Get('/remove/:taskId')
  async deleteTask(@Param('taskId') taskId: string, @Request() req) {
    const existingTask = await this.taskRepository.findOne({
      where: { taskId: taskId },
    });
    if (!existingTask) {
      throw new NotFoundException('删除失败，任务不存在！');
    }
    // existingTask的创建者校验是否是当前用户
    console.log(
      'existingTask.creator',
      existingTask.creator,
      req.user.username,
    );
    if (existingTask.creator !== req.user.username) {
      throw new NotFoundException('删除失败，无权限修改');
    }
    // // existingTask的状态校验是否已经被接收
    if (TaskStatus.CREATED !== existingTask.status) {
      return '任务状态已经变更，无法删除!';
    }
    const result: DeleteResult = await this.taskRepository.delete({
      taskId: taskId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`删除失败，当前任务已被删除`);
    }
    return `您已成功删除该任务`;
  }

  // 获取任务
  @Get('/all')
  async getAllTasks() {
    const res = await this.taskRepository.find();
    return res;
  }

  // 获取指定任务
  @Get(':key/:value')
  async getTaskById(
    @Param('key') key: keyof Task,
    @Param('value') value: string,
  ) {
    const user = await this.taskService.findTask({
      where: { [key]: value },
    });
    return user;
  }
}
