import { FolderKanban, Plus } from 'lucide-react';
import type { Activity, Project, Task } from '../types/nova';

type Props = {
  projects: Project[];
  tasks: Task[];
  activities: Activity[];
  completedTasksCount: number;
  pendingTasksCount: number;
  completionRate: number;
  onNewProject: () => void;
};

export default function Dashboard({
  projects, tasks, activities, completedTasksCount, pendingTasksCount, completionRate, onNewProject,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Projects" value={projects.length} />
        <Stat title="Pending Tasks" value={pendingTasksCount} />
        <Stat title="Completed Tasks" value={completedTasksCount} />
        <Stat title="Overall Completion" value={`${completionRate}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h3 className="font-semibold">Current Projects</h3>
            <button onClick={onNewProject} className="text-xs flex items-center gap-1">
              <Plus size={14} /> New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FolderKanban className="mx-auto mb-2" size={32} />
              <p className="text-sm">No projects created yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => {
                const projectTasks = tasks.filter((task) => task.projectId === project.id);
                const done = projectTasks.filter((task) => task.status === 'Completed').length;
                const percent = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0;

                return (
                  <div key={project.id} className="p-4 rounded-lg border bg-slate-50/50">
                    <div className="flex justify-between gap-4">
                      <div>
                        <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded">{project.category}</span>
                        <h4 className="font-medium mt-1">{project.name}</h4>
                        <p className="text-xs text-slate-500">{project.description}</p>
                      </div>
                      <span className="text-xs text-slate-500">Due: {project.deadline}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Progress</span><span>{done}/{projectTasks.length} Tasks ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                        <div className="bg-slate-900 h-full rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold border-b pb-3 mb-4">Activity Stream</h3>
          {activities.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No recent activity logged.</p>
          ) : (
            <div className="space-y-4">
              {activities.slice(0, 8).map((activity) => (
                <div key={activity.id} className="text-xs">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}{' '}
                    <strong>{activity.details}</strong>
                  </p>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200">
      <span className="text-xs font-semibold text-slate-500 uppercase">{title}</span>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}
