import { Clock, Plus, Trash2 } from 'lucide-react';
import type { Project, Task } from '../types/nova';

type Props = {
  projects: Project[];
  tasks: Task[];
  onNewProject: () => void;
  onDeleteProject: (id: string, name: string) => void;
};

export default function Projects({ projects, tasks, onNewProject, onDeleteProject }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Projects Directory</h3>
          <p className="text-xs text-slate-500">Manage team initiatives and roadmaps</p>
        </div>
        <button onClick={onNewProject} className="flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg">
          <Plus size={16} /> Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center text-slate-500">
          No projects available. Create your first project.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const projectTasks = tasks.filter((task) => task.projectId === project.id);
            const completed = projectTasks.filter((task) => task.status === 'Completed').length;
            const progress = projectTasks.length ? Math.round((completed / projectTasks.length) * 100) : 0;

            return (
              <div key={project.id} className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] bg-slate-100 border px-2 py-0.5 rounded">{project.category}</span>
                  <button onClick={() => onDeleteProject(project.id, project.name)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">{project.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{project.description || 'No description provided.'}</p>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="flex gap-1"><Clock size={12} /> {project.deadline}</span>
                    <span>{completed}/{projectTasks.length} Tasks</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 block text-right">{progress}% completed</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
