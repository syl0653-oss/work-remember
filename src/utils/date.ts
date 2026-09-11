import { format } from 'date-fns';
import type { ISODate } from '../models/types';

const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

export function toISODate(date: Date): ISODate {
  return format(date, 'yyyy-MM-dd');
}

export function formatDotDate(iso: ISODate): string {
  const [y, m, d] = iso.split('-');
  return `${y}.${m}.${d}`;
}

export function weekdayLabel(iso: ISODate): string {
  return WEEKDAYS_SHORT[new Date(`${iso}T00:00:00`).getDay()];
}

export function formatTopBarDate(date: Date): string {
  return `${formatDotDate(toISODate(date))} ${weekdayLabel(toISODate(date))}`;
}

export function todayISO(): ISODate {
  return toISODate(new Date());
}

export function formatLongKoreanDate(date: Date): string {
  const iso = toISODate(date);
  const [y, m, d] = iso.split('-').map((v) => parseInt(v, 10));
  return `${y}년 ${m}월 ${d}일 ${weekdayLabel(iso)}요일`;
}

export function isWithinRange(iso: ISODate, start: ISODate, end: ISODate): boolean {
  return iso >= start && iso <= end;
}

export function rangesOverlap(
  aStart: ISODate,
  aEnd: ISODate,
  bStart: ISODate,
  bEnd: ISODate,
): boolean {
  return aStart <= bEnd && aEnd >= bStart;
}
