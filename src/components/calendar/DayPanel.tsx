import type { Change, Task, WorkLog } from '../../models/types';
import { Card } from '../ui/Card';
import { statusMark } from '../../utils/labels';
import { formatDotDate, weekdayLabel } from '../../utils/date';
import styles from './DayPanel.module.css';

interface DayPanelProps {
  selected: string;
  tasks: Task[];
  logs: WorkLog[];
  changes: Change[];
  resolveProjectName: (projectId: string | null) => string;
}

export function DayPanel({ selected, tasks, logs, changes, resolveProjectName }: DayPanelProps) {
  const isEmpty = !tasks.length && !logs.length && !changes.length;

  return (
    <Card padding="16px">
      <div className={styles.dateLabel}>{formatDotDate(selected)}</div>
      <div className={styles.weekdayLabel}>{weekdayLabel(selected)}요일</div>

      <div className={styles.kicker}>할 일 · 업무</div>
      {tasks.map((t) => (
        <div key={t.id} className={styles.taskRow}>
          <span className={styles.taskMark}>{statusMark(t.status)}</span>
          <span className={styles.taskTitle}>{t.title}</span>
          <span className={styles.taskProject}>{resolveProjectName(t.projectId)}</span>
        </div>
      ))}

      <div className={styles.kickerSpaced}>업무 기록</div>
      {logs.map((l) => (
        <div key={l.id} className={styles.logRow}>
          <div className={styles.logTitle}>{l.title}</div>
          <div className={styles.logDid}>{l.did}</div>
        </div>
      ))}

      <div className={styles.kickerSpaced}>변동사항</div>
      {changes.map((c) => (
        <div key={c.id} className={styles.changeRow}>
          <span className={styles.changeSource}>{c.source}</span> · {c.content}
        </div>
      ))}

      {isEmpty && <div className={styles.emptyNote}>이 날짜에 기록된 항목이 없습니다.</div>}
    </Card>
  );
}
