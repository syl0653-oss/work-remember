import type { Priority, Status } from '../models/types';

export function statusLabel(status: Status): string {
  return status === 'done' ? '완료' : status === 'doing' ? '진행중' : '예정';
}

export function statusMark(status: Status): string {
  return status === 'done' ? '☑' : status === 'doing' ? '◐' : '☐';
}

export function priorityLabel(priority: Priority): string {
  return priority === 'high' ? '우선순위 높음' : priority === 'low' ? '우선순위 낮음' : '우선순위 보통';
}
