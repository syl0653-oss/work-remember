import styles from './HistoryFilterBar.module.css';

export interface MonthOption {
  value: string;
  label: string;
  hasData: boolean;
}

interface HistoryFilterBarProps {
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  months: MonthOption[];
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
  summary: string;
}

export function HistoryFilterBar({
  years,
  selectedYear,
  onYearChange,
  months,
  selectedMonth,
  onMonthSelect,
  summary,
}: HistoryFilterBarProps) {
  return (
    <div className={styles.bar}>
      <select
        className={styles.yearSelect}
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>
      <div className={styles.months}>
        {months.map((mo) => {
          const isActive = selectedMonth === mo.value;
          const cls = isActive
            ? styles.monthBtnActive
            : mo.hasData
              ? styles.monthBtnHasData
              : styles.monthBtn;
          return (
            <button key={mo.value} type="button" className={cls} onClick={() => onMonthSelect(mo.value)}>
              {mo.label}
            </button>
          );
        })}
      </div>
      <div className={styles.spacer} />
      <span className={styles.summary}>{summary}</span>
    </div>
  );
}
