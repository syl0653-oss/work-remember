import { Menu, Search } from 'lucide-react';
import { useUiStore } from '../../services/uiStore';
import { formatTopBarDate } from '../../utils/date';
import styles from './TopBar.module.css';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const query = useUiStore((s) => s.query);
  const setQuery = useUiStore((s) => s.setQuery);

  return (
    <div className={styles.topBar}>
      <button type="button" className={styles.menuBtn} onClick={onMenuClick} aria-label="메뉴 열기">
        <Menu size={20} strokeWidth={1.7} />
      </button>
      <div className={styles.searchBox}>
        <Search size={14} strokeWidth={2} />
        <input
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="업무 · 히스토리 · 인사이트 검색"
        />
      </div>
      <div className={styles.spacer} />
      <div className={styles.todayLabel}>{formatTopBarDate(new Date())}</div>
    </div>
  );
}
