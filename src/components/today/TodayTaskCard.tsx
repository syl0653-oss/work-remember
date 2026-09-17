import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project, Task } from '../../models/types';
import { Card } from '../ui/Card';
import { TaskRow } from '../task/TaskRow';
import styles from './TodayTaskCard.module.css';

interface TodayTaskCardProps {
  tasks: Task[];
  projects: Project[];
  resolveProjectName: (projectId: string | null) => string;
  onQuickAdd: (title: string) => void;
  onCycle: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onComplete: (taskId: string, wantsLog: boolean) => void;
  onDelete: (taskId: string) => void;
  onChangeProject: (taskId: string, projectId: string | null) => void;
  className?: string;
}

export function TodayTaskCard({
  tasks,
  projects,
  resolveProjectName,
  onQuickAdd,
  onCycle,
  onToggleSubtask,
  onComplete,
  onDelete,
  onChangeProject,
  className,
}: TodayTaskCardProps) {
  const [draft, setDraft] = useState('');

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onQuickAdd(value);
    setDraft('');
  };

  return (
    <Card className={className}>
      <div className={styles.header}>
        <h2 className={styles.title}>오늘의 할 일</h2>
        <Link to="/tasks" className={styles.viewAll}>
          전체 보기 →
        </Link>
      </div>
      <div className={styles.quickAddRow}>
        <input
          className={styles.quickAddInput}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder="+ 오늘 할 일 빠르게 추가 (Enter)"
        />
        <button type="button" className={styles.addBtn} onClick={submit}>
          추가
        </button>
      </div>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          projectName={resolveProjectName(task.projectId)}
          variant="today"
          projects={projects}
          onCycle={() => onCycle(task.id)}
          onToggleSubtask={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
          onAddSubtask={() => {}}
          onComplete={(wantsLog) => onComplete(task.id, wantsLog)}
          onDelete={() => onDelete(task.id)}
          onChangeProject={(projectId) => onChangeProject(task.id, projectId)}
        />
      ))}
    </Card>
  );
}
