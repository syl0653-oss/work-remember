import { useState } from 'react';
import { useAppStore } from '../services/storage';
import { addMonthNote, toggleMonthNote, deleteMonthNote } from '../services/monthNoteService';
import { addLeave, deleteLeave } from '../services/leaveService';
import { addChange } from '../services/changeService';
import { saveWorkLog, type WorkLogDraft } from '../services/logService';
import { isWithinRange, rangesOverlap, todayISO } from '../utils/date';
import {
  buildMonthDays,
  firstOfMonth,
  lastOfMonth,
  monthKeyOf,
  monthLabel,
  shiftMonth,
} from '../utils/calendar';
import { MonthGrid } from '../components/calendar/MonthGrid';
import { MonthNotesCard } from '../components/calendar/MonthNotesCard';
import { LeaveCard } from '../components/calendar/LeaveCard';
import { DayPanel } from '../components/calendar/DayPanel';
import styles from './CalendarPage.module.css';

export function CalendarPage() {
  const data = useAppStore((s) => s.data);
  const today = todayISO();
  const [cursor, setCursor] = useState(() => firstOfMonth(today));
  const [selected, setSelected] = useState(today);
  const [logDraft, setLogDraft] = useState<WorkLogDraft | null>(null);

  const resolveProjectName = (projectId: string | null) => {
    if (!projectId) return '미지정';
    return data.projects.find((p) => p.id === projectId)?.name ?? '미지정';
  };

  const days = buildMonthDays(cursor);
  const monthKey = monthKeyOf(cursor);
  const notes = data.monthNotes[monthKey] ?? [];

  const dayTasks = data.tasks.filter((t) => t.due === selected);
  const dayLogs = data.workLogs.filter((w) => w.date === selected);
  const dayChanges = data.changes.filter((c) => c.date === selected);

  const monthStart = firstOfMonth(cursor);
  const monthEnd = lastOfMonth(cursor);
  const monthLeaves = data.leaves.filter((l) => rangesOverlap(l.start, l.end, monthStart, monthEnd));

  const handleSelectDay = (iso: string) => {
    setSelected(iso);
    setLogDraft(null);
  };

  const openDayLogDraft = () => {
    setLogDraft({
      taskId: null,
      title: '',
      project: data.projects[0]?.name ?? '',
      did: '',
      result: '',
      insight: '',
      next: '',
    });
  };

  const changeDayLogDraft = (field: keyof Omit<WorkLogDraft, 'taskId'>, value: string) => {
    setLogDraft((d) => (d ? { ...d, [field]: value } : d));
  };

  const saveDayLogDraft = () => {
    if (!logDraft) return;
    saveWorkLog(logDraft, selected);
    setLogDraft(null);
  };

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.header}>
          <h1 className={styles.monthTitle}>{monthLabel(cursor)}</h1>
          <div className={styles.spacer} />
          <button type="button" className={styles.navBtn} onClick={() => setCursor((c) => shiftMonth(c, -1))}>
            ‹
          </button>
          <button
            type="button"
            className={styles.todayBtn}
            onClick={() => {
              setCursor(firstOfMonth(today));
              setSelected(today);
            }}
          >
            오늘
          </button>
          <button type="button" className={styles.navBtn} onClick={() => setCursor((c) => shiftMonth(c, 1))}>
            ›
          </button>
        </div>

        <MonthGrid
          days={days}
          today={today}
          selected={selected}
          hasTask={(iso) => data.tasks.some((t) => t.due === iso)}
          hasLog={(iso) => data.workLogs.some((w) => w.date === iso)}
          hasChange={(iso) => data.changes.some((c) => c.date === iso)}
          leavesForDay={(iso) => data.leaves.filter((l) => isWithinRange(iso, l.start, l.end)).map((l) => l.label)}
          onSelect={handleSelectDay}
        />
      </div>

      <aside className={styles.aside}>
        <MonthNotesCard
          notes={notes}
          monthLabel={monthLabel(cursor)}
          onAdd={(text) => addMonthNote(monthKey, text)}
          onToggle={(noteId) => toggleMonthNote(monthKey, noteId)}
          onDelete={(noteId) => deleteMonthNote(monthKey, noteId)}
        />
        <LeaveCard
          leaves={monthLeaves}
          onAdd={addLeave}
          onDelete={deleteLeave}
        />
        <DayPanel
          selected={selected}
          tasks={dayTasks}
          logs={dayLogs}
          changes={dayChanges}
          resolveProjectName={resolveProjectName}
          onAddChange={(content) => addChange(content, selected)}
          logDraft={logDraft}
          onOpenLogDraft={openDayLogDraft}
          onChangeLogDraft={changeDayLogDraft}
          onSaveLogDraft={saveDayLogDraft}
          onCancelLogDraft={() => setLogDraft(null)}
        />
      </aside>
    </div>
  );
}
