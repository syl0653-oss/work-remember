import type { ISODate } from '../models/types';
import { toISODate } from './date';

export type MonthKey = `${number}-${string}`;

export interface CalendarDay {
  iso: ISODate;
  day: number;
  inMonth: boolean;
}

function parseCursor(cursorISO: ISODate): Date {
  return new Date(`${cursorISO}T00:00:00`);
}

export function monthLabel(cursorISO: ISODate): string {
  const cursor = parseCursor(cursorISO);
  return `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;
}

export function monthKeyOf(cursorISO: ISODate): MonthKey {
  const cursor = parseCursor(cursorISO);
  const mm = String(cursor.getMonth() + 1).padStart(2, '0');
  return `${cursor.getFullYear()}-${mm}`;
}

export function shiftMonth(cursorISO: ISODate, delta: number): ISODate {
  const cursor = parseCursor(cursorISO);
  cursor.setMonth(cursor.getMonth() + delta);
  return `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-01`;
}

export function firstOfMonth(iso: ISODate): ISODate {
  const [y, m] = iso.split('-');
  return `${y}-${m}-01`;
}

export function lastOfMonth(cursorISO: ISODate): ISODate {
  const cursor = parseCursor(cursorISO);
  const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  return toISODate(last);
}

export function buildMonthDays(cursorISO: ISODate): CalendarDay[] {
  const cursor = parseCursor(cursorISO);
  const y = cursor.getFullYear();
  const m = cursor.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    days.push({ iso: toISODate(dt), day: dt.getDate(), inMonth: dt.getMonth() === m });
  }
  return days;
}
