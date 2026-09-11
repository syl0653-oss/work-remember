import { create } from 'zustand';
import type { AppData } from '../models/types';
import { seedAppData } from '../models/seed';
import { supabase } from './supabaseClient';

const STORAGE_KEY = 'workos.v1';
const TABLE = 'app_data';

function loadLocalAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {
    // 파싱 실패 → 샘플 데이터로 폴백
  }
  return seedAppData();
}

function persistLocalAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 저장 실패(용량 초과, 프라이빗 모드 등)는 조용히 무시
  }
}

async function persistCloudAppData(userId: string, data: AppData): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(TABLE)
    .upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
  if (error) {
    // eslint-disable-next-line no-console
    console.error('클라우드 저장 실패:', error.message);
  }
}

interface AppStore {
  data: AppData;
  status: 'idle' | 'loading' | 'ready';
  userId: string | null;
  /** 복제 → 수정 → 저장 → setState. 모든 mutation은 이 경로로만 처리한다. */
  update: (mutate: (draft: AppData) => void) => void;
  resetToSeed: () => void;
  /** 로그인 성공 시 호출: 클라우드 데이터를 불러오고(없으면 현재 로컬 데이터로 초기 생성) 상태를 전환한다. */
  loadForUser: (userId: string) => Promise<void>;
  /** 로그아웃 시 호출: 로컬 저장 모드로 복귀한다. */
  clearUser: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  data: loadLocalAppData(),
  status: 'idle',
  userId: null,

  update: (mutate) => {
    const draft = JSON.parse(JSON.stringify(get().data)) as AppData;
    mutate(draft);
    set({ data: draft });
    const userId = get().userId;
    if (userId) {
      void persistCloudAppData(userId, draft);
    } else {
      persistLocalAppData(draft);
    }
  },

  resetToSeed: () => {
    const seed = seedAppData();
    set({ data: seed });
    const userId = get().userId;
    if (userId) {
      void persistCloudAppData(userId, seed);
    } else {
      persistLocalAppData(seed);
    }
  },

  loadForUser: async (userId) => {
    set({ status: 'loading', userId });
    if (!supabase) {
      set({ status: 'ready' });
      return;
    }
    const { data: row, error } = await supabase
      .from(TABLE)
      .select('data')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('클라우드 불러오기 실패:', error.message);
    }

    if (row?.data) {
      set({ data: row.data as AppData, status: 'ready' });
    } else {
      // 첫 로그인: 지금 갖고 있던(로컬) 데이터를 클라우드 초기값으로 올린다.
      const initial = get().data;
      await persistCloudAppData(userId, initial);
      set({ data: initial, status: 'ready' });
    }
  },

  clearUser: () => {
    set({ data: loadLocalAppData(), status: 'idle', userId: null });
  },
}));
