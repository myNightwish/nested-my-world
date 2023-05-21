import { TaskStatus } from './task-status.enum';

export class TaskDTO {
  title: string;
  status: TaskStatus;
  price: number;
  deadline: Date;
}
