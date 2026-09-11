import { useAppStore } from './storage';
import { uid } from '../utils/id';
import type { ISODate } from '../models/types';

export function addLeave(label: string, start: ISODate, end: ISODate): void {
  const value = label.trim();
  if (!value || !start || !end) return;
  const [s, e] = start <= end ? [start, end] : [end, start];
  useAppStore.getState().update((d) => {
    d.leaves.push({ id: uid(), label: value, start: s, end: e });
  });
}

export function deleteLeave(id: string): void {
  useAppStore.getState().update((d) => {
    d.leaves = d.leaves.filter((l) => l.id !== id);
  });
}
