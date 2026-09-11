import type { WorkLogDraft } from '../../services/logService';
import styles from './WorkLogForm.module.css';

interface WorkLogFormProps {
  draft: WorkLogDraft;
  onChange: (field: keyof Omit<WorkLogDraft, 'taskId'>, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function WorkLogForm({ draft, onChange, onSave, onCancel }: WorkLogFormProps) {
  return (
    <div className={styles.form}>
      <label className={styles.label}>
        제목
        <input
          className={styles.field}
          value={draft.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        프로젝트
        <input
          className={styles.field}
          value={draft.project}
          onChange={(e) => onChange('project', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        오늘 한 일
        <textarea
          className={styles.textareaField}
          value={draft.did}
          onChange={(e) => onChange('did', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        결과
        <textarea
          className={styles.textareaField}
          value={draft.result}
          onChange={(e) => onChange('result', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        인사이트
        <textarea
          className={styles.textareaField}
          value={draft.insight}
          onChange={(e) => onChange('insight', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        다음 액션
        <textarea
          className={styles.textareaField}
          value={draft.next}
          onChange={(e) => onChange('next', e.target.value)}
        />
      </label>
      <div className={styles.actions}>
        <button type="button" className={styles.saveBtn} onClick={onSave}>
          저장
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
