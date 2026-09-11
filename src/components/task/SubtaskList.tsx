import type { Subtask } from '../../models/types';
import { statusMark } from '../../utils/labels';
import styles from './SubtaskList.module.css';

interface SubtaskListProps {
  subtasks: Subtask[];
  onToggle: (subtaskId: string) => void;
}

export function SubtaskList({ subtasks, onToggle }: SubtaskListProps) {
  if (!subtasks.length) return null;
  return (
    <div className={styles.list}>
      {subtasks.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onToggle(s.id)}
          className={s.status === 'done' ? styles.rowDone : styles.row}
        >
          <span className={styles.mark}>{statusMark(s.status)}</span>
          {s.title}
        </button>
      ))}
    </div>
  );
}
