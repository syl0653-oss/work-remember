import { useAppStore } from './storage';
import { useUiStore } from './uiStore';
import { uid } from '../utils/id';
import { toISODate } from '../utils/date';
import { nextStatus } from '../utils/progress';
import type { Task } from '../models/types';

export function addTask(title: string): void {
  const value = title.trim();
  if (!value) return;
  const today = toISODate(new Date());
  useAppStore.getState().update((d) => {
    const task: Task = {
      id: uid(),
      title: value,
      description: '',
      status: 'todo',
      priority: 'normal',
      start: today,
      due: today,
      projectId: d.projects[0]?.id ?? null,
      category: '기타',
      tags: [],
      subtasks: [],
      createdAt: today,
      updatedAt: today,
    };
    d.tasks.unshift(task);
  });
}

export function cycleTaskStatus(taskId: string): void {
  const today = toISODate(new Date());
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (!t) return;
    t.status = nextStatus(t.status);
    t.updatedAt = today;
  });
}

export function toggleSubtaskStatus(taskId: string, subtaskId: string): void {
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (!t) return;
    const s = t.subtasks.find((x) => x.id === subtaskId);
    if (!s) return;
    s.status = nextStatus(s.status);
    if (t.subtasks.every((x) => x.status === 'done')) t.status = 'done';
    else if (t.subtasks.some((x) => x.status !== 'todo')) t.status = 'doing';
  });
}

export function addSubtask(taskId: string, title: string): void {
  const value = title.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (!t) return;
    t.subtasks.push({ id: uid(), title: value, status: 'todo' });
  });
}

export function setTaskProject(taskId: string, projectId: string | null): void {
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (t) t.projectId = projectId;
  });
}

export function setTaskCategory(taskId: string, category: string): void {
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (t) t.category = category;
  });
}

export function deleteTask(taskId: string): void {
  useAppStore.getState().update((d) => {
    d.tasks = d.tasks.filter((t) => t.id !== taskId);
  });
}

export function completeTask(taskId: string): void {
  const today = toISODate(new Date());
  useAppStore.getState().update((d) => {
    const t = d.tasks.find((x) => x.id === taskId);
    if (!t) return;
    t.status = 'done';
    t.subtasks.forEach((s) => {
      s.status = 'done';
    });
    t.updatedAt = today;
  });
}

/**
 * 업무 완료 + (히스토리 체크박스가 켜져 있으면) 기록 폼 프리필해서 열기.
 * 기록 폼은 오늘 페이지에 있으므로, 호출한 쪽에서 wantsLog가 true면 /today로 이동해야 한다.
 */
export function completeTaskAndMaybeLog(taskId: string, wantsLog: boolean): void {
  const { data } = useAppStore.getState();
  const task = data.tasks.find((t) => t.id === taskId);
  completeTask(taskId);
  if (!wantsLog || !task) return;

  const projectName = task.projectId
    ? (data.projects.find((p) => p.id === task.projectId)?.name ?? '')
    : '';
  const did = task.subtasks.length
    ? task.subtasks.map((s) => `- ${s.title}`).join('\n')
    : task.description || '';

  useUiStore.getState().openLogDraft({
    taskId: task.id,
    title: task.title,
    project: projectName,
    did,
    result: '',
    insight: '',
    next: '',
  });
}
