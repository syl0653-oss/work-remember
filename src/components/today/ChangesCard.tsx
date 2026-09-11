import { useState } from 'react';
import type { Change } from '../../models/types';
import { Card } from '../ui/Card';
import styles from './ChangesCard.module.css';

interface ChangesCardProps {
  changes: Change[];
  onConvert: (change: Change) => void;
  onAdd: (content: string) => void;
}

export function ChangesCard({ changes, onConvert, onAdd }: ChangesCardProps) {
  const [draft, setDraft] = useState('');

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft('');
  };

  return (
    <Card>
      <h2 className={styles.title}>오늘의 변동사항</h2>
      {changes.map((c) => (
        <div key={c.id} className={styles.item}>
          <div className={styles.source}>{c.source}</div>
          <div className={styles.content}>{c.content}</div>
          <button type="button" className={styles.convertBtn} onClick={() => onConvert(c)}>
            → 업무로 전환
          </button>
        </div>
      ))}
      <input
        className={styles.input}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder="+ 변동사항 기록 (Enter)"
      />
    </Card>
  );
}
