import { create } from 'zustand';
import type { WorkLogDraft } from './logService';

interface UiStore {
  pendingLogDraft: WorkLogDraft | null;
  openLogDraft: (draft: WorkLogDraft) => void;
  updateLogDraftField: (field: keyof Omit<WorkLogDraft, 'taskId'>, value: string) => void;
  closeLogDraft: () => void;
  query: string;
  setQuery: (query: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  pendingLogDraft: null,
  openLogDraft: (draft) => set({ pendingLogDraft: draft }),
  updateLogDraftField: (field, value) =>
    set((s) => (s.pendingLogDraft ? { pendingLogDraft: { ...s.pendingLogDraft, [field]: value } } : s)),
  closeLogDraft: () => set({ pendingLogDraft: null }),
  query: '',
  setQuery: (query) => set({ query }),
}));
