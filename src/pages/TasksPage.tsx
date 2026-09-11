import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../services/storage';
import {
  addTask,
  cycleTaskStatus,
  toggleSubtaskStatus,
  addSubtask,
  completeTaskAndMaybeLog,
  deleteTask,
} from '../services/taskService';
import { TaskList } from '../components/task/TaskList';
import { TaskBoard } from '../components/task/TaskBoard';
import styles from './TasksPage.module.css';

type View = 'list' | 'board';

export function TasksPage() {
  const data = useAppStore((s) => s.data);
  const navigate = useNavigate();
  const [view, setView] = useState<View>('list');
  const [draftTitle, setDraftTitle] = useState('');

  const handleComplete = (taskId: string, wantsLog: boolean) => {
    completeTaskAndMaybeLog(taskId, wantsLog);
    if (wantsLog) navigate('/today');
  };

  const resolveProjectName = (projectId: string | null) => {
    if (!projectId) return '미지정';
    return data.projects.find((p) => p.id === projectId)?.name ?? '미지정';
  };

  const submitNewTask = () => {
    const value = draftTitle.trim();
    if (!value) return;
    addTask(value);
    setDraftTitle('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>업무 / 할 일</h1>
        <div className={styles.segmented}>
          <button
            type="button"
            className={view === 'list' ? styles.segmentBtnActive : styles.segmentBtn}
            onClick={() => setView('list')}
          >
            리스트
          </button>
          <button
            type="button"
            className={view === 'board' ? styles.segmentBtnActive : styles.segmentBtn}
            onClick={() => setView('board')}
          >
            보드
          </button>
        </div>
        <div className={styles.spacer} />
        <input
          className={styles.quickAdd}
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitNewTask();
          }}
          placeholder="+ 새 업무 (Enter)"
        />
      </div>

      {view === 'list' ? (
        <TaskList
          tasks={data.tasks}
          resolveProjectName={resolveProjectName}
          onCycle={cycleTaskStatus}
          onToggleSubtask={toggleSubtaskStatus}
          onAddSubtask={addSubtask}
          onComplete={handleComplete}
          onDelete={deleteTask}
        />
      ) : (
        <TaskBoard tasks={data.tasks} resolveProjectName={resolveProjectName} onCycle={cycleTaskStatus} />
      )}
    </div>
  );
}
