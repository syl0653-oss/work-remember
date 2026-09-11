import { useState } from 'react';
import type { Leave } from '../../models/types';
import { Card } from '../ui/Card';
import { formatDotDate, todayISO } from '../../utils/date';
import styles from './LeaveCard.module.css';

interface LeaveCardProps {
  leaves: Leave[];
  onAdd: (label: string, start: string, end: string) => void;
  onDelete: (id: string) => void;
}

export function LeaveCard({ leaves, onAdd, onDelete }: LeaveCardProps) {
  const today = todayISO();
  const [label, setLabel] = useState('');
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  const submit = () => {
    const value = label.trim();
    if (!value) return;
    onAdd(value, start, end);
    setLabel('');
  };

  return (
    <Card padding="16px">
      <div className={styles.title}>연차 · 휴가</div>
      <div className={styles.form}>
        <input
          className={styles.labelInput}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder="이름 (예: 하연 연차)"
        />
        <div className={styles.dateRow}>
          <input
            type="date"
            className={styles.dateInput}
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <span className={styles.dateSep}>~</span>
          <input
            type="date"
            className={styles.dateInput}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <button type="button" className={styles.submitBtn} onClick={submit}>
          등록
        </button>
      </div>
      <div className={styles.list}>
        {leaves.map((l) => (
          <div key={l.id} className={styles.row}>
            <span className={styles.rowLabel}>{l.label}</span>
            <span className={styles.rowRange}>
              {l.start === l.end ? formatDotDate(l.start) : `${formatDotDate(l.start)}~${formatDotDate(l.end)}`}
            </span>
            <button type="button" className={styles.deleteBtn} onClick={() => onDelete(l.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
