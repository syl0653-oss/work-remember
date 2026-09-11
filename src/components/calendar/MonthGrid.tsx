import type { CalendarDay } from '../../utils/calendar';
import type { ISODate } from '../../models/types';
import { DayCell } from './DayCell';
import styles from './MonthGrid.module.css';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface MonthGridProps {
  days: CalendarDay[];
  today: ISODate;
  selected: ISODate;
  hasTask: (iso: ISODate) => boolean;
  hasLog: (iso: ISODate) => boolean;
  hasChange: (iso: ISODate) => boolean;
  leavesForDay: (iso: ISODate) => string[];
  onSelect: (iso: ISODate) => void;
}

export function MonthGrid({
  days,
  today,
  selected,
  hasTask,
  hasLog,
  hasChange,
  leavesForDay,
  onSelect,
}: MonthGridProps) {
  return (
    <div>
      <div className={styles.grid}>
        {WEEKDAYS.map((w, i) => (
          <div key={w} className={i === 0 ? styles.weekdaySunday : styles.weekday}>
            {w}
          </div>
        ))}
        {days.map((day) => (
          <DayCell
            key={day.iso}
            day={day}
            isToday={day.iso === today}
            isSelected={day.iso === selected}
            hasTask={hasTask(day.iso)}
            hasLog={hasLog(day.iso)}
            hasChange={hasChange(day.iso)}
            leaveLabels={leavesForDay(day.iso)}
            onSelect={() => onSelect(day.iso)}
          />
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'var(--green)' }} />
          업무 · 할 일
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'var(--mustard)' }} />
          업무 기록
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'var(--red)' }} />
          변동사항
        </span>
      </div>
    </div>
  );
}
