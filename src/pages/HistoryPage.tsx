import { useState } from 'react';
import { useAppStore } from '../services/storage';
import { formatDotDate, weekdayLabel, todayISO } from '../utils/date';
import { setWorkLogProject } from '../services/logService';
import { WorkLogCard } from '../components/worklog/WorkLogCard';
import { HistoryFilterBar, type MonthOption } from '../components/worklog/HistoryFilterBar';
import type { WorkLog } from '../models/types';
import styles from './HistoryPage.module.css';

export function HistoryPage() {
  const data = useAppStore((s) => s.data);
  const [histYear, setHistYear] = useState<string | null>(null);
  const [histMonth, setHistMonth] = useState('all');

  const resolveProjectName = (projectId: string | null) => {
    if (!projectId) return '미지정';
    return data.projects.find((p) => p.id === projectId)?.name ?? '미지정';
  };

  const years = Array.from(new Set(data.workLogs.map((w) => w.date.slice(0, 4)))).sort().reverse();
  const hy = histYear && years.includes(histYear) ? histYear : (years[0] ?? todayISO().slice(0, 4));
  const yearOptions = years.length ? years : [hy];

  const monthsWithData = new Set(
    data.workLogs.filter((w) => w.date.slice(0, 4) === hy).map((w) => w.date.slice(5, 7)),
  );
  const monthOptions: MonthOption[] = [
    { value: 'all', label: '전체', hasData: true },
    ...Array.from({ length: 12 }, (_, i) => {
      const v = String(i + 1).padStart(2, '0');
      return { value: v, label: `${i + 1}월`, hasData: monthsWithData.has(v) };
    }),
  ];

  const filtered = data.workLogs.filter(
    (w) => w.date.slice(0, 4) === hy && (histMonth === 'all' || w.date.slice(5, 7) === histMonth),
  );
  const summary = `${hy}년 ${histMonth === 'all' ? '전체' : `${parseInt(histMonth, 10)}월`} · ${filtered.length}건`;

  const byDate = new Map<string, WorkLog[]>();
  filtered.forEach((w) => {
    const list = byDate.get(w.date) ?? [];
    list.push(w);
    byDate.set(w.date, list);
  });
  const groups = Array.from(byDate.keys())
    .sort()
    .reverse()
    .map((date) => ({ date, items: byDate.get(date)! }));

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>업무 히스토리</h1>
      <div className={styles.subtitle}>실제로 수행한 업무 기록 {filtered.length}건</div>

      <HistoryFilterBar
        years={yearOptions}
        selectedYear={hy}
        onYearChange={setHistYear}
        months={monthOptions}
        selectedMonth={histMonth}
        onMonthSelect={setHistMonth}
        summary={summary}
      />

      {filtered.length === 0 && <div className={styles.empty}>해당 기간에 기록된 업무가 없습니다.</div>}

      {groups.map((g) => (
        <div key={g.date} className={styles.group}>
          <div className={styles.groupHeader}>
            {formatDotDate(g.date)} {weekdayLabel(g.date)}
          </div>
          {g.items.map((log) => (
            <WorkLogCard
              key={log.id}
              log={log}
              projectName={resolveProjectName(log.projectId)}
              variant="full"
              projects={data.projects}
              onChangeProject={(projectId) => setWorkLogProject(log.id, projectId)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
