import { useAppStore } from './storage';
import { uid } from '../utils/id';
import type { MonthKey } from '../utils/calendar';

export function addMonthNote(monthKey: MonthKey, text: string): void {
  const value = text.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    if (!d.monthNotes[monthKey]) d.monthNotes[monthKey] = [];
    d.monthNotes[monthKey].push({ id: uid(), text: value, done: false });
  });
}

export function toggleMonthNote(monthKey: MonthKey, noteId: string): void {
  useAppStore.getState().update((d) => {
    const note = d.monthNotes[monthKey]?.find((n) => n.id === noteId);
    if (note) note.done = !note.done;
  });
}

export function deleteMonthNote(monthKey: MonthKey, noteId: string): void {
  useAppStore.getState().update((d) => {
    if (d.monthNotes[monthKey]) {
      d.monthNotes[monthKey] = d.monthNotes[monthKey].filter((n) => n.id !== noteId);
    }
  });
}
