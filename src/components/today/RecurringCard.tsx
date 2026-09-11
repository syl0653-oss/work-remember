import type { Frequency, RecurringDef, RecurringLog, Status } from '../../models/types';
import { statusMark } from '../../utils/labels';
import { Card } from '../ui/Card';
import subtaskStyles from '../task/SubtaskList.module.css';
import styles from './RecurringCard.module.css';

const GROUPS: { key: Frequency; label: string }[] = [
  { key: 'daily', label: '매일' },
  { key: 'weekly', label: '매주' },
  { key: 'monthly', label: '매월' },
];

interface RecurringCardProps {
  defs: RecurringDef[];
  recurringLog: RecurringLog;
  todayISO: string;
  onToggle: (defId: string) => void;
}

export function RecurringCard({ defs, recurringLog, todayISO, onToggle }: RecurringCardProps) {
  const groups = GROUPS.map(({ key, label }) => ({
    label,
    items: defs.filter((d) => d.frequency === key),
  })).filter((g) => g.items.length);

  return (
    <Card>
      <h2 className={styles.title}>반복 업무</h2>
      {groups.map((g) => (
        <div key={g.label} className={styles.group}>
          <div className={styles.groupLabel}>{g.label}</div>
          {g.items.map((def) => {
            const status: Status = recurringLog[`${def.id}|${todayISO}`] ?? 'todo';
            const done = status === 'done';
            return (
              <button
                key={def.id}
                type="button"
                onClick={() => onToggle(def.id)}
                className={done ? subtaskStyles.rowDone : subtaskStyles.row}
              >
                <span className={subtaskStyles.mark}>{statusMark(status)}</span>
                {def.title}
              </button>
            );
          })}
        </div>
      ))}
    </Card>
  );
}
