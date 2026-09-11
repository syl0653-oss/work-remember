import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  background: string;
  color: string;
  border?: string;
  children: ReactNode;
}

export function Badge({ background, color, border, children }: BadgeProps) {
  return (
    <span className={styles.badge} style={{ background, color, border }}>
      {children}
    </span>
  );
}
