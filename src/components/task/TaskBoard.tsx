import type { Status, Task } from '../../models/types';
import { statusLabel } from '../../utils/labels';
import { TaskCard } from './TaskCard';
import styles from './TaskBoard.module.css';

const COLUMNS: Status[] = ['todo', 'doing', 'done'];

interface TaskBoardProps {
  tasks: Task[];
  resolveProjectName: (projectId: string | null) => string;
  onCycle: (taskId: string) => void;
}

export function TaskBoard({ tasks, resolveProjectName, onCycle }: TaskBoardProps) {
  return (
    <div className={styles.board}>
      {COLUMNS.map((status) => {
        const items = tasks.filter((t) => t.status === status);
        return (
          <div key={status} className={styles.column}>
            <div className={styles.columnHeader}>
              <span>{statusLabel(status)}</span>
              <span className={styles.columnCount}>{items.length}</span>
            </div>
            {items.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                projectName={resolveProjectName(task.projectId)}
                onCycle={() => onCycle(task.id)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
