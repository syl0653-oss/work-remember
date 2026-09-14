import { useAppStore } from './storage';
import { uid } from '../utils/id';

export function addProject(name: string): void {
  const value = name.trim();
  if (!value) return;
  useAppStore.getState().update((d) => {
    d.projects.push({ id: uid(), name: value });
  });
}
