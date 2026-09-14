import type { Project, WorkLog } from '../../models/types';
import type { WorkLogDraft } from '../../services/logService';
import { Card } from '../ui/Card';
import { WorkLogForm } from '../worklog/WorkLogForm';
import { WorkLogCard } from '../worklog/WorkLogCard';
import styles from './TodayLogCard.module.css';

interface TodayLogCardProps {
  logs: WorkLog[];
  projects: Project[];
  resolveProjectName: (projectId: string | null) => string;
  draft: WorkLogDraft | null;
  onOpen: () => void;
  onChange: (field: keyof Omit<WorkLogDraft, 'taskId'>, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChangeLogProject: (logId: string, projectId: string | null) => void;
  className?: string;
}

export function TodayLogCard({
  logs,
  projects,
  resolveProjectName,
  draft,
  onOpen,
  onChange,
  onSave,
  onCancel,
  onChangeLogProject,
  className,
}: TodayLogCardProps) {
  return (
    <Card className={className}>
      <div className={styles.header}>
        <h2 className={styles.title}>오늘의 업무 기록</h2>
        <button type="button" className={styles.addBtn} onClick={onOpen}>
          + 업무 기록 추가
        </button>
      </div>
      {draft && (
        <WorkLogForm draft={draft} onChange={onChange} onSave={onSave} onCancel={onCancel} />
      )}
      {logs.map((log) => (
        <WorkLogCard
          key={log.id}
          log={log}
          projectName={resolveProjectName(log.projectId)}
          projects={projects}
          onChangeProject={(projectId) => onChangeLogProject(log.id, projectId)}
        />
      ))}
    </Card>
  );
}
