import { useAppStore } from './storage';
import { todayISO } from '../utils/date';

export function toggleRecurringToday(defId: string): void {
  const key = `${defId}|${todayISO()}` as const;
  useAppStore.getState().update((d) => {
    d.recurringLog[key] = d.recurringLog[key] === 'done' ? 'todo' : 'done';
  });
}
