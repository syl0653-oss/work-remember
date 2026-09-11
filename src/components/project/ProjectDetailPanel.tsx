import type { Insight, Task, WorkLog } from '../../models/types';
import { statusMark, statusLabel } from '../../utils/labels';
import { formatDotDate } from '../../utils/date';
import styles from './ProjectDetailPanel.module.css';

interface ProjectDetailPanelProps {
  projectName: string;
  tasks: Task[];
  logs: WorkLog[];
  insights: Insight[];
}

export function ProjectDetailPanel({ projectName, tasks, logs, insights }: ProjectDetailPanelProps) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>{projectName}</h2>
      <div className={styles.columns}>
        <div>
          <div className={styles.kicker}>업무</div>
          {tasks.map((t) => (
            <div key={t.id} className={styles.taskRow}>
              <span className={styles.taskMark}>{statusMark(t.status)}</span>
              <span className={styles.taskTitle}>{t.title}</span>
              <span className={styles.taskStatus}>{statusLabel(t.status)}</span>
            </div>
          ))}
        </div>
        <div>
          <div className={styles.kicker}>업무 히스토리</div>
          {logs.map((l) => (
            <div key={l.id} className={styles.logRow}>
              <div className={styles.logTitle}>{l.title}</div>
              <div className={styles.logDate}>{formatDotDate(l.date)}</div>
            </div>
          ))}
        </div>
        <div>
          <div className={styles.kicker}>인사이트 · 변동사항</div>
          {insights.map((i) => (
            <div key={i.id} className={styles.insightRow}>
              {i.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
