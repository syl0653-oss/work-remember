import type { WorkLog } from '../../models/types';
import styles from './WorkLogCard.module.css';

interface WorkLogCardProps {
  log: WorkLog;
  projectName: string;
  variant?: 'compact' | 'full';
}

const FIELDS: { key: 'did' | 'result' | 'insight' | 'next'; label: string }[] = [
  { key: 'did', label: '오늘 한 일' },
  { key: 'result', label: '결과' },
  { key: 'insight', label: '인사이트' },
  { key: 'next', label: '다음 액션' },
];

export function WorkLogCard({ log, projectName, variant = 'compact' }: WorkLogCardProps) {
  if (variant === 'full') {
    const tagsLabel = log.tags.length ? `#${log.tags.join(' #')}` : '';
    return (
      <div className={styles.fullCard}>
        <div className={styles.fullTopLine}>
          <span className={styles.projectChip}>{projectName}</span>
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
        <span className={styles.projectChip}>{projectName}</span>
        <span className={styles.title}>{log.title}</span>
      </div>
      <div className={styles.did}>{log.did}</div>
    </div>
  );
}
