import { useAppStore } from './storage';
import { uid } from '../utils/id';
import { todayISO } from '../utils/date';
import type { ISODate } from '../models/types';

export interface WorkLogDraft {
  taskId: string | null;
  title: string;
  project: string;
  did: string;
  result: string;
  insight: string;
  next: string;
}

export function saveWorkLog(draft: WorkLogDraft, date: ISODate = todayISO()): void {
  useAppStore.getState().update((d) => {
    const project = d.projects.find((p) => p.name === draft.project);
    const id = uid();
    d.workLogs.unshift({
      id,
      date,
      projectId: project ? project.id : null,
      title: draft.title || '무제 기록',
      did: draft.did,
      result: draft.result,
      insight: draft.insight,
      learned: '',
      next: draft.next,
      tags: [],
      sourceTaskId: draft.taskId,
    });
    if (draft.insight.trim()) {
      d.insights.unshift({
        id: uid(),
        content: draft.insight.trim(),
        sourceWorkLogId: id,
        projectId: project ? project.id : null,
      });
    }
  });
}

export function setWorkLogProject(workLogId: string, projectId: string | null): void {
  useAppStore.getState().update((d) => {
    const log = d.workLogs.find((w) => w.id === workLogId);
    if (log) log.projectId = projectId;
  });
}
