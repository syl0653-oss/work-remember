import { useState } from 'react';
import type { Task } from '../../models/types';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { TaskStatusBadge } from './TaskStatusBadge';
import { SubtaskList } from './SubtaskList';
import { PriorityBadge } from './PriorityBadge';
import { taskProgress } from '../../utils/progress';
import { priorityLabel } from '../../utils/labels';
import { formatDotDate } from '../../utils/date';
import styles from './TaskRow.module.css';

interface TaskRowProps {
  task: Task;
  projectName: string;
  variant?: 'list' | 'today';
  onCycle: () => void;
  onToggleSubtask: (subtaskId: string) => void;
  onAddSubtask: (title: string) => void;
  onComplete: (wantsLog: boolean) => void;
  onDelete: () => void;
}

export function TaskRow({
  task,
  projectName,
  variant = 'list',
  onCycle,
  onToggleSubtask,
  onAddSubtask,
  onComplete,
  onDelete,
}: TaskRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [subDraft, setSubDraft] = useState('');
  const [logChecked, setLogChecked] = useState(false);

  const isToday = variant === 'today';
  const pct = taskProgress(task);
  const progressLabel = task.subtasks.length
    ? `${task.subtasks.filter((s) => s.status === 'done').length}/${task.subtasks.length} · ${Math.round(pct * 100)}%`
    : '체크리스트 없음';

  const submitSubtask = () => {
    const value = subDraft.trim();
    if (!value) return;
    onAddSubtask(value);
    setSubDraft('');
  };

  return (
    <div className={isToday ? styles.rowToday : styles.row}>
      <div className={styles.main}>
        <Checkbox
          status={task.status}
          onToggle={onCycle}
          title={isToday ? '상태 변경' : undefined}
        />
        <div className={styles.body}>
          <div className={styles.topLine}>
            <button
              type="button"
              className={task.status === 'done' ? styles.titleDone : styles.title}
              onClick={() => setExpanded((v) => !v)}
            >
              {task.title}
            </button>
            <TaskStatusBadge status={task.status} />
            {isToday ? (
              task.priority === 'high' && <PriorityBadge />
            ) : (
              <span className={styles.priorityLabel}>{priorityLabel(task.priority)}</span>
            )}
          </div>
          <div className={styles.meta}>
            <span>{projectName}</span>
            {!isToday && <span>{task.category}</span>}
            <span>마감 {formatDotDate(task.due)}</span>
            <span>{progressLabel}</span>
          </div>

          {expanded && (
            <div className={isToday ? styles.expandAreaToday : styles.expandArea}>
              {!isToday && (
                <div className={styles.description}>{task.description || '설명 없음'}</div>
              )}
              <SubtaskList subtasks={task.subtasks} onToggle={onToggleSubtask} />
              {!isToday && (
                <div className={styles.subAddRow}>
                  <input
                    className={styles.subInput}
                    value={subDraft}
                    onChange={(e) => setSubDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitSubtask();
                    }}
                    placeholder="+ 체크리스트 항목"
                  />
                </div>
              )}
              <div className={styles.actionsRow}>
                <label className={styles.logLabel}>
                  <input
                    type="checkbox"
                    checked={logChecked}
                    onChange={(e) => setLogChecked(e.target.checked)}
                  />
                  업무 히스토리에 기록하기
                </label>
                <Button variant="primary" onClick={() => onComplete(logChecked)}>
                  업무 완료
                </Button>
                <Button variant="ghost" style={{ color: 'var(--text-disabled)' }} onClick={onDelete}>
                  삭제
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
