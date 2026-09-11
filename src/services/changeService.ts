import { useAppStore } from './storage';
import { uid } from '../utils/id';
import { todayISO } from '../utils/date';

export function addChange(content: string): void {
  const value = content.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    d.changes.unshift({ id: uid(), date: todayISO(), source: '메모', content: value, linkedTaskId: null });
  });
}
