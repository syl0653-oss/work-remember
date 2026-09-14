import type { Project, Task } from '../../models/types';
import { TaskRow } from './TaskRow';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  resolveProjectName: (projectId: string | null) => string;
  onCycle: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onComplete: (taskId: string, wantsLog: boolean) => void;
  onDelete: (taskId: string) => void;
  onChangeProject: (taskId: string, projectId: string | null) => void;
  onChangeCategory: (taskId: string, category: string) => void;
}

export function TaskList({
  tasks,
  projects,
  resolveProjectName,
  onCycle,
  onToggleSubtask,
  onAddSubtask,
  onComplete,
  onDelete,
  onChangeProject,
  onChangeCategory,
}: TaskListProps) {
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          projectName={resolveProjectName(task.projectId)}
          projects={projects}
          onCycle={() => onCycle(task.id)}
          onToggleSubtask={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
          onAddSubtask={(title) => onAddSubtask(task.id, title)}
          onComplete={(wantsLog) => onComplete(task.id, wantsLog)}
          onDelete={() => onDelete(task.id)}
          onChangeProject={(projectId) => onChangeProject(task.id, projectId)}
          onChangeCategory={(category) => onChangeCategory(task.id, category)}
        />
      ))}
    </div>
  );
}
