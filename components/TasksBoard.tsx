import { CheckCircle2, Circle, Clock, Plus } from 'lucide-react';
import type { Project, Task } from '../types/nova';
import TaskCard from './TaskCard';

type Props = {
  projects: Project[];
  tasks: Task[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  projectFilter: string;
  setProjectFilter: (value: string) => void;
  onNewTask: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string, title: string) => void;
  onSelect: (task: Task) => void;
};

const columns = [
  { status: 'To Do', label: 'To Do', icon: Circle },
  { status: 'In Progress', label: 'In Progress', icon: Clock },
  { status: 'Completed', label: 'Completed', icon: CheckCircle2 },
];

export default function TasksBoard({
  projects, tasks, statusFilter, setStatusFilter, projectFilter, setProjectFilter,
  onNewTask, onUpdateStatus, onDelete, onSelect,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl border">
        <div className="flex flex-wrap gap-2">
          {['all', 'To Do', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs rounded-md ${
                statusFilter === status ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {status === 'all' ? 'All Tasks' : status}
            </button>
          ))}

          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="text-xs border rounded-md px-3">
            <option value="all">All Projects</option>
            {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
        </div>

        <button onClick={onNewTask} className="flex items-center justify-center gap-2 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-lg">
          <Plus size={14} /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(({ status, label, icon: Icon }) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <div key={status} className="bg-slate-100/70 p-4 rounded-xl border min-h-[400px] space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase flex items-center gap-2">
                  <Icon size={12} /> {label}
                </span>
                <span className="text-xs bg-white px-2 py-0.5 rounded-full">{columnTasks.length}</span>
              </div>

              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDelete}
                  onSelect={() => onSelect(task)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
