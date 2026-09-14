import { useAppStore } from '../services/storage';
import { formatDotDate } from '../utils/date';
import { InsightCard } from '../components/insight/InsightCard';
import styles from './InsightsPage.module.css';

export function InsightsPage() {
  const data = useAppStore((s) => s.data);

  const resolveProjectName = (projectId: string | null) => {
    if (!projectId) return null;
    return data.projects.find((p) => p.id === projectId)?.name ?? null;
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>인사이트</h1>
      {data.insights.map((i) => {
        const workLog = data.workLogs.find((w) => w.id === i.sourceWorkLogId);
        const projectName = workLog ? resolveProjectName(workLog.projectId) : null;
        const source = workLog
          ? `${formatDotDate(workLog.date)} · ${projectName ? `${projectName} ` : ''}${workLog.title}`
          : '직접 작성';
        return <InsightCard key={i.id} content={i.content} source={source} />;
      })}
    </div>
  );
}
