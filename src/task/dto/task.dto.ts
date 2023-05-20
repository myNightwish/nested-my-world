enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class TaskDTO {
  id: number;
  title: string;
  status: TaskStatus;
  payment: number;
  deadline: Date;
}
