import { useState } from 'react';
import type { Memo } from '../../models/types';
import { Card } from '../ui/Card';
import styles from './QuickMemoCard.module.css';

interface QuickMemoCardProps {
  memos: Memo[];
  onAdd: (content: string) => void;
  onToTask: (memo: Memo) => void;
}

export function QuickMemoCard({ memos, onAdd, onToTask }: QuickMemoCardProps) {
  const [draft, setDraft] = useState('');

  return (
    <Card>
      <h2 className={styles.title}>빠른 메모</h2>
      <textarea
        className={styles.textarea}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            const value = draft.trim();
            if (!value) return;
            onAdd(value);
            setDraft('');
          }
        }}
        placeholder="분류하지 말고 일단 적기 (⌘/Ctrl+Enter 저장)"
      />
      {memos.map((m) => (
        <div key={m.id} className={styles.row}>
          <span className={styles.content}>{m.content}</span>
          <button type="button" className={styles.toTaskBtn} onClick={() => onToTask(m)}>
            업무로
          </button>
        </div>
      ))}
    </Card>
  );
}
