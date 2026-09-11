import styles from './ProjectCard.module.css';

export interface ProjectCardStats {
  id: string;
  name: string;
  doing: number;
  todo: number;
  done: number;
  logs: number;
  progressPct: number;
}

interface ProjectCardProps {
  project: ProjectCardStats;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      className={isSelected ? styles.cardSelected : styles.card}
      onClick={onClick}
    >
      <div className={styles.header}>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.progressLabel}>{Math.round(project.progressPct * 100)}%</span>
      </div>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${Math.round(project.progressPct * 100)}%` }} />
      </div>
      <div className={styles.meta}>
        <span>진행중 {project.doing}</span>
        <span>예정 {project.todo}</span>
        <span>완료 {project.done}</span>
        <span>기록 {project.logs}</span>
      </div>
    </button>
  );
}
