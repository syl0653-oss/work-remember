import { useAppStore } from './storage';
import { uid } from '../utils/id';
import { todayISO } from '../utils/date';

export function addMemo(content: string): void {
  const value = content.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    d.memos.unshift({ id: uid(), content: value, createdAt: todayISO() });
  });
}
