import type { Task } from '../../models/types';
import { taskProgress, nextStatus } from '../../utils/progress';
import { statusLabel } from '../../utils/labels';
import { formatDotDate } from '../../utils/date';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  projectName: string;
  onCycle: () => void;
}

export function TaskCard({ task, projectName, onCycle }: TaskCardProps) {
  const pct = taskProgress(task);
  const nextLabel = `${statusLabel(nextStatus(task.status))}으로`;

  return (
    <div className={styles.card}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.meta}>
        <span>{projectName}</span>
        <span>마감 {formatDotDate(task.due)}</span>
      </div>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${Math.round(pct * 100)}%` }} />
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.nextBtn} onClick={onCycle}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
