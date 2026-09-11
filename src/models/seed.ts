import type { AppData } from './types';

// 로컬 저장소가 비어있거나 파싱에 실패했을 때 쓰는 빈 초기 상태.
export function seedAppData(): AppData {
  return {
    projects: [],
    categories: [],
    tasks: [],
    recurringDefs: [],
    recurringLog: {},
    workLogs: [],
    insights: [],
    changes: [],
    memos: [],
    monthNotes: {},
    leaves: [],
  };
}
