import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useUiStore } from '../../services/uiStore';
import { SearchResultsView } from '../search/SearchResultsView';
import styles from './AppShell.module.css';

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const query = useUiStore((s) => s.query);
  const isSearching = query.trim().length > 0;

  return (
    <div className={styles.shell}>
      <Sidebar isOpen={drawerOpen} onNavigate={() => setDrawerOpen(false)} />
      {drawerOpen && <div className={styles.backdrop} onClick={() => setDrawerOpen(false)} />}
      <main className={styles.main}>
        <TopBar onMenuClick={() => setDrawerOpen(true)} />
        <div className={styles.content}>{isSearching ? <SearchResultsView /> : <Outlet />}</div>
      </main>
    </div>
  );
}
