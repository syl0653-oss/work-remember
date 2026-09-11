import { useState } from 'react';
import { Pin } from 'lucide-react';
import type { MonthNote } from '../../models/types';
import { Card } from '../ui/Card';
import styles from './MonthNotesCard.module.css';

interface MonthNotesCardProps {
  notes: MonthNote[];
  monthLabel: string;
  onAdd: (text: string) => void;
  onToggle: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

export function MonthNotesCard({ notes, monthLabel, onAdd, onToggle, onDelete }: MonthNotesCardProps) {
  const [draft, setDraft] = useState('');

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft('');
  };

  return (
    <Card padding="16px">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Pin size={13} strokeWidth={1.8} color="var(--mustard)" />
          <span className={styles.title}>이달의 고정 메모</span>
        </div>
        <span className={styles.monthLabel}>{monthLabel}</span>
      </div>
      <div className={styles.items}>
        {notes.map((n) => (
          <div key={n.id} className={styles.row}>
            <button type="button" className={styles.mark} onClick={() => onToggle(n.id)}>
              {n.done ? '☑' : '☐'}
            </button>
            <span className={n.done ? styles.textDone : styles.text}>{n.text}</span>
            <button type="button" className={styles.deleteBtn} onClick={() => onDelete(n.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        className={styles.input}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder="+ 항목 추가 (Enter)"
      />
    </Card>
  );
}
