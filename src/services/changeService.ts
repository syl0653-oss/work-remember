import { useAppStore } from './storage';
import { uid } from '../utils/id';
import { todayISO } from '../utils/date';
import type { ISODate } from '../models/types';

export function addChange(content: string, date: ISODate = todayISO()): void {
  const value = content.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    d.changes.unshift({ id: uid(), date, source: '메모', content: value, linkedTaskId: null });
  });
}
