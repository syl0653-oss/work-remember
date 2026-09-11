import { useState } from 'react';
import { useAppStore } from '../services/storage';
import { ProjectCard, type ProjectCardStats } from '../components/project/ProjectCard';
import { ProjectDetailPanel } from '../components/project/ProjectDetailPanel';
import styles from './ProjectsPage.module.css';

export function ProjectsPage() {
  const data = useAppStore((s) => s.data);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const projectCards: ProjectCardStats[] = data.projects.map((p) => {
    const tasks = data.tasks.filter((t) => t.projectId === p.id);
    const doing = tasks.filter((t) => t.status === 'doing').length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const logs = data.workLogs.filter((w) => w.projectId === p.id).length;
    return {
      id: p.id,
      name: p.name,
      doing,
      todo,
      done,
      logs,
      progressPct: tasks.length ? done / tasks.length : 0,
    };
  });

  const openProject = data.projects.find((p) => p.id === openProjectId) ?? null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>프로젝트</h1>
      <div className={styles.grid}>
        {projectCards.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            isSelected={openProjectId === p.id}
            onClick={() => setOpenProjectId((cur) => (cur === p.id ? null : p.id))}
          />
        ))}
      </div>

      {openProject && (
        <ProjectDetailPanel
          projectName={openProject.name}
          tasks={data.tasks.filter((t) => t.projectId === openProject.id)}
          logs={data.workLogs.filter((w) => w.projectId === openProject.id)}
          insights={data.insights.filter((i) => i.projectId === openProject.id)}
        />
      )}
    </div>
  );
}
