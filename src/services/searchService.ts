import type { AppData } from '../models/types';
import { statusLabel } from '../utils/labels';
import { formatDotDate } from '../utils/date';

export interface SearchResult {
  kind: '업무' | '히스토리' | '인사이트';
  title: string;
  meta: string;
}

function resolveProjectName(data: AppData, projectId: string | null): string {
  if (!projectId) return '미지정';
  return data.projects.find((p) => p.id === projectId)?.name ?? '미지정';
}

export function searchAll(data: AppData, rawQuery: string): SearchResult[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  data.tasks
    .filter((t) => `${t.title}${t.description}${t.tags.join()}`.toLowerCase().includes(q))
    .forEach((t) => {
      results.push({
        kind: '업무',
        title: t.title,
        meta: `${resolveProjectName(data, t.projectId)} · ${statusLabel(t.status)} · 마감 ${formatDotDate(t.due)}`,
      });
    });

  data.workLogs
    .filter((w) =>
      `${w.title}${w.did}${w.result}${w.insight}${w.next}${w.tags.join()}`.toLowerCase().includes(q),
    )
    .forEach((w) => {
      results.push({
        kind: '히스토리',
        title: w.title,
        meta: `${formatDotDate(w.date)} · ${resolveProjectName(data, w.projectId)}`,
      });
    });

  data.insights
    .filter((i) => i.content.toLowerCase().includes(q))
    .forEach((i) => {
      results.push({
        kind: '인사이트',
        title: i.content,
        meta: resolveProjectName(data, i.projectId),
      });
    });

  return results;
}
