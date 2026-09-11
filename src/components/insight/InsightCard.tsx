import styles from './InsightCard.module.css';

interface InsightCardProps {
  content: string;
  source: string;
}

export function InsightCard({ content, source }: InsightCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{content}</div>
      <div className={styles.source}>출처 · {source}</div>
    </div>
  );
}
