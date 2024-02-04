enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

// const task = new Task();
// task.id = 1;
// task.title = 'First task';
// task.description = 'This is the first task';
// task.status = TaskStatus.OPEN;
