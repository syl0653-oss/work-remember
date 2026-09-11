import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  CheckSquare,
  FileText,
  Folder,
  Lightbulb,
  LogOut,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { useAuthStore } from '../../services/authStore';
import { signOut } from '../../services/authService';
import styles from './Sidebar.module.css';

const ICON_PROPS = { size: 16, strokeWidth: 1.7 };

const NAV_ITEMS = [
  { to: '/today', label: '오늘', icon: Home },
  { to: '/calendar', label: '캘린더', icon: Calendar },
  { to: '/tasks', label: '업무 / 할 일', icon: CheckSquare },
  { to: '/history', label: '업무 히스토리', icon: FileText },
  { to: '/projects', label: '프로젝트', icon: Folder },
  { to: '/insights', label: '인사이트', icon: Lightbulb },
] as const;

interface SidebarProps {
  isOpen?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ isOpen = false, onNavigate }: SidebarProps) {
  const session = useAuthStore((s) => s.session);

  return (
    <aside className={isOpen ? styles.sidebarOpen : styles.sidebar}>
      <div className={styles.brand}>MY WORK</div>

      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            isActive ? styles.navItemActive : styles.navItem
          }
        >
          <Icon {...ICON_PROPS} />
          <span>{label}</span>
        </NavLink>
      ))}

      <div className={styles.spacer} />

      {isSupabaseConfigured && session ? (
        <>
          <div className={styles.accountEmail} title={session.user.email ?? ''}>
            {session.user.email}
          </div>
          <button type="button" className={styles.navItem} onClick={() => signOut()}>
            <LogOut {...ICON_PROPS} />
            <span>로그아웃</span>
          </button>
        </>
      ) : (
        <div className={styles.caption}>V1 · 로컬 저장</div>
      )}
    </aside>
  );
}
