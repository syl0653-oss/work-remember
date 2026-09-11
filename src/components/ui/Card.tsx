import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  padding?: string;
  className?: string;
  children: ReactNode;
}

export function Card({ padding = '14px 16px', className, children }: CardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')} style={{ padding }}>
      {children}
    </div>
  );
}
