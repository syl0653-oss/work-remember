import { useAppStore } from '../../services/storage';
import { useUiStore } from '../../services/uiStore';
import { searchAll } from '../../services/searchService';
import styles from './SearchResultsView.module.css';

export function SearchResultsView() {
  const data = useAppStore((s) => s.data);
  const query = useUiStore((s) => s.query);
  const results = searchAll(data, query);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>검색 결과</h1>
      <div className={styles.summary}>
        &quot;{query}&quot; · {results.length}건
      </div>
      {results.map((r, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.kind}>{r.kind}</span>
          <div className={styles.body}>
            <div className={styles.resultTitle}>{r.title}</div>
            <div className={styles.meta}>{r.meta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
