import type { Status, Task } from '../models/types';

export function taskProgress(task: Task): number {
  if (task.subtasks.length) {
    return task.subtasks.filter((s) => s.status === 'done').length / task.subtasks.length;
  }
  return task.status === 'done' ? 1 : task.status === 'doing' ? 0.5 : 0;
}

export function nextStatus(status: Status): Status {
  return status === 'todo' ? 'doing' : status === 'doing' ? 'done' : 'todo';
}
