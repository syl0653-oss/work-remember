import { create } from 'zustand';
import type { AppData } from '../models/types';
import { seedAppData } from '../models/seed';

const STORAGE_KEY = 'workos.v1';

function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {
    // 파싱 실패 → 샘플 데이터로 폴백
  }
  return seedAppData();
}

function persistAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 저장 실패(용량 초과, 프라이빗 모드 등)는 조용히 무시
  }
}

interface AppStore {
  data: AppData;
  /** 복제 → 수정 → 저장 → setState. 모든 mutation은 이 경로로만 처리한다. */
  update: (mutate: (draft: AppData) => void) => void;
  resetToSeed: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  data: loadAppData(),
  update: (mutate) => {
    const draft = JSON.parse(JSON.stringify(get().data)) as AppData;
    mutate(draft);
    persistAppData(draft);
    set({ data: draft });
  },
  resetToSeed: () => {
    const seed = seedAppData();
    persistAppData(seed);
    set({ data: seed });
  },
}));
