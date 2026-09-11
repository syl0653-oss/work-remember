import type { CalendarDay } from '../../utils/calendar';
import styles from './DayCell.module.css';

interface DayCellProps {
  day: CalendarDay;
  isToday: boolean;
  isSelected: boolean;
  hasTask: boolean;
  hasLog: boolean;
  hasChange: boolean;
  leaveLabels: string[];
  onSelect: () => void;
}

export function DayCell({
  day,
  isToday,
  isSelected,
  hasTask,
  hasLog,
  hasChange,
  leaveLabels,
  onSelect,
}: DayCellProps) {
  const base = isSelected ? styles.cellSelected : isToday ? styles.cellToday : styles.cell;
  const cellClass = [base, !day.inMonth && styles.outOfMonth].filter(Boolean).join(' ');

  return (
    <button type="button" className={cellClass} onClick={onSelect}>
      <span className={isToday ? styles.numToday : styles.num}>{day.day}</span>
      {leaveLabels.map((label, i) => (
        <span key={i} className={styles.leaveLabel} title={label}>
          {label}
        </span>
      ))}
      <span className={styles.dots}>
        {hasTask && <span className={styles.dot} style={{ background: 'var(--green)' }} />}
        {hasLog && <span className={styles.dot} style={{ background: 'var(--mustard)' }} />}
        {hasChange && <span className={styles.dot} style={{ background: 'var(--red)' }} />}
      </span>
    </button>
  );
}
