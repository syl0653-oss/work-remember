import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../services/storage';
import {
  addTask,
  cycleTaskStatus,
  toggleSubtaskStatus,
  completeTaskAndMaybeLog,
  deleteTask,
  setTaskProject,
} from '../services/taskService';
import { toggleRecurringToday } from '../services/recurringService';
import { addChange } from '../services/changeService';
import { addMemo } from '../services/memoService';
import { saveWorkLog, setWorkLogProject } from '../services/logService';
import { useUiStore } from '../services/uiStore';
import { todayISO, formatLongKoreanDate } from '../utils/date';
import type { Change, Memo } from '../models/types';
import { TodayTaskCard } from '../components/today/TodayTaskCard';
import { RecurringCard } from '../components/today/RecurringCard';
import { ChangesCard } from '../components/today/ChangesCard';
import { QuickMemoCard } from '../components/today/QuickMemoCard';
import { TodayLogCard } from '../components/today/TodayLogCard';
import styles from './TodayPage.module.css';

export function TodayPage() {
  const data = useAppStore((s) => s.data);
  const navigate = useNavigate();
  const logDraft = useUiStore((s) => s.pendingLogDraft);
  const openLogDraft = useUiStore((s) => s.openLogDraft);
  const updateLogDraftField = useUiStore((s) => s.updateLogDraftField);
  const closeLogDraft = useUiStore((s) => s.closeLogDraft);

  const today = todayISO();

  const handleComplete = (taskId: string, wantsLog: boolean) => {
    completeTaskAndMaybeLog(taskId, wantsLog);
    if (wantsLog) navigate('/today');
  };

  const resolveProjectName = (projectId: string | null) => {
    if (!projectId) return '미지정';
    return data.projects.find((p) => p.id === projectId)?.name ?? '미지정';
  };

  const todayTasks = data.tasks.filter((t) => t.due === today || t.status === 'doing');
  const doneCount = todayTasks.filter((t) => t.status === 'done').length;
  const pct = todayTasks.length ? doneCount / todayTasks.length : 0;

  const todayChanges = data.changes.filter((c) => c.date === today);
  const todayLogs = data.workLogs.filter((w) => w.date === today);

  const convertToTask = (content: string) => {
    addTask(content);
    navigate('/tasks');
  };

  const openBlankLog = () => {
    openLogDraft({
      taskId: null,
      title: '',
      project: data.projects[0]?.name ?? '',
      did: '',
      result: '',
      insight: '',
      next: '',
    });
  };

  const handleSaveLog = () => {
    if (!logDraft) return;
    saveWorkLog(logDraft);
    closeLogDraft();
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>오늘</h1>
          <div className={styles.subtitle}>{formatLongKoreanDate(new Date())}</div>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressLabelRow}>
            <span>오늘의 업무 진행률</span>
            <span className={styles.progressValue}>
              {doneCount} / {todayTasks.length} 완료 · {Math.round(pct * 100)}%
            </span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${Math.round(pct * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <TodayTaskCard
          className={styles.span2}
          tasks={todayTasks}
          projects={data.projects}
          resolveProjectName={resolveProjectName}
          onQuickAdd={addTask}
          onCycle={cycleTaskStatus}
          onToggleSubtask={toggleSubtaskStatus}
          onComplete={handleComplete}
          onDelete={deleteTask}
          onChangeProject={setTaskProject}
        />

        <RecurringCard
          defs={data.recurringDefs}
          recurringLog={data.recurringLog}
          todayISO={today}
          onToggle={toggleRecurringToday}
        />

        <ChangesCard
          changes={todayChanges}
          onConvert={(change: Change) => convertToTask(change.content)}
          onAdd={addChange}
        />

        <QuickMemoCard
          memos={data.memos}
          onAdd={addMemo}
          onToTask={(memo: Memo) => convertToTask(memo.content)}
        />

        <TodayLogCard
          className={styles.span2}
          logs={todayLogs}
          projects={data.projects}
          resolveProjectName={resolveProjectName}
          draft={logDraft}
          onOpen={openBlankLog}
          onChange={updateLogDraftField}
          onSave={handleSaveLog}
          onCancel={closeLogDraft}
          onChangeLogProject={setWorkLogProject}
        />
      </div>
    </div>
  );
}
