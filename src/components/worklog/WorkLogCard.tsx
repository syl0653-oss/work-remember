import type { Project, WorkLog } from '../../models/types';
import styles from './WorkLogCard.module.css';

interface WorkLogCardProps {
  log: WorkLog;
  projectName: string;
  variant?: 'compact' | 'full';
  projects?: Project[];
  onChangeProject?: (projectId: string | null) => void;
}

const FIELDS: { key: 'did' | 'result' | 'insight' | 'next'; label: string }[] = [
  { key: 'did', label: '오늘 한 일' },
  { key: 'result', label: '결과' },
  { key: 'insight', label: '인사이트' },
  { key: 'next', label: '다음 액션' },
];

function ProjectChip({
  projectName,
  projects,
  currentProjectId,
  onChangeProject,
}: {
  projectName: string;
  projects?: Project[];
  currentProjectId: string | null;
  onChangeProject?: (projectId: string | null) => void;
}) {
  if (!projects || !onChangeProject) {
    return <span className={styles.projectChip}>{projectName}</span>;
  }
  return (
    <select
      className={styles.projectChip}
      value={currentProjectId ?? ''}
      onChange={(e) => onChangeProject(e.target.value || null)}
    >
      <option value="">미지정</option>
      {projects.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}

export function WorkLogCard({
  log,
  projectName,
  variant = 'compact',
  projects,
  onChangeProject,
}: WorkLogCardProps) {
  if (variant === 'full') {
    const tagsLabel = log.tags.length ? `#${log.tags.join(' #')}` : '';
    return (
      <div className={styles.fullCard}>
        <div className={styles.fullTopLine}>
          <ProjectChip
            projectName={projectName}
            projects={projects}
            currentProjectId={log.projectId}
            onChangeProject={onChangeProject}
          />
          <span className={styles.fullTitle}>{log.title}</span>
          <span className={styles.tags}>{tagsLabel}</span>
        </div>
        <div className={styles.fieldGrid}>
          {FIELDS.map(({ key, label }) => (
            <div key={key}>
              <div className={styles.fieldLabel}>{label}</div>
              <div className={styles.fieldValue}>{log[key] || '—'}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <div className={styles.topLine}>
        <ProjectChip
          projectName={projectName}
          projects={projects}
          currentProjectId={log.projectId}
          onChangeProject={onChangeProject}
        />
        <span className={styles.title}>{log.title}</span>
      </div>
      <div className={styles.did}>{log.did}</div>
    </div>
  );
}
