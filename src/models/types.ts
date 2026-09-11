export type Status = 'todo' | 'doing' | 'done'; // UI: 예정 / 진행중 / 완료
export type Priority = 'high' | 'normal' | 'low'; // UI: 높음 / 보통 / 낮음
export type Frequency = 'daily' | 'weekly' | 'monthly'; // UI: 매일 / 매주 / 매월
export type ISODate = string; // 'YYYY-MM-DD'

export interface Project {
  id: string;
  name: string;
}

export interface Subtask {
  id: string;
  title: string;
  status: Status;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  start: ISODate;
  due: ISODate;
  projectId: string | null;
  category: string; // categories[] 중 하나
  tags: string[];
  subtasks: Subtask[];
  createdAt: ISODate;
  updatedAt: ISODate;
}

// 반복 업무 '정의'와 '실행 기록'은 반드시 분리
export interface RecurringDef {
  id: string;
  title: string;
  frequency: Frequency;
  projectId: string | null;
}
export type RecurringLog = Record<`${string}|${ISODate}`, Status>; // key: `${defId}|${date}`

export interface WorkLog {
  id: string;
  date: ISODate;
  projectId: string | null;
  title: string;
  did: string;
  result: string;
  insight: string;
  learned: string;
  next: string;
  tags: string[];
  sourceTaskId: string | null; // 업무 완료 → 히스토리 연결
}

export interface Insight {
  id: string;
  content: string;
  sourceWorkLogId: string | null;
  projectId: string | null;
}

export interface Change {
  id: string;
  date: ISODate;
  source: string;
  content: string;
  linkedTaskId: string | null;
}

export interface Memo {
  id: string;
  content: string;
  createdAt: ISODate;
}

export interface MonthNote {
  id: string;
  text: string;
  done: boolean;
}
export type MonthNotes = Record<`${number}-${string}`, MonthNote[]>; // key: 'YYYY-MM'

// 연차 · 휴가 등 기간(하루~여러 날)에 걸친 캘린더 라벨
export interface Leave {
  id: string;
  label: string;
  start: ISODate;
  end: ISODate;
}

export interface AppData {
  projects: Project[];
  categories: string[];
  tasks: Task[];
  recurringDefs: RecurringDef[];
  recurringLog: RecurringLog;
  workLogs: WorkLog[];
  insights: Insight[];
  changes: Change[];
  memos: Memo[];
  monthNotes: MonthNotes;
  leaves: Leave[];
}
