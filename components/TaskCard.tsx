import { Calendar, Trash2 } from 'lucide-react';
import type { Task } from '../types/nova';

type Props = {
  task: Task;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string, title: string) => void;
  onSelect: () => void;
};

export default function TaskCard({ task, onUpdateStatus, onDelete, onSelect }: Props) {
  const priorityClass =
    task.priority === 'High'
      ? 'bg-red-50 text-red-700 border-red-200'
      : task.priority === 'Medium'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <div onClick={onSelect} className="bg-white rounded-lg p-3.5 border shadow-sm space-y-3 cursor-pointer">
      <div className="flex justify-between">
        <span className={`text-[10px] border px-2 py-0.5 rounded ${priorityClass}`}>{task.priority}</span>
        <button onClick={(e) => { e.stopPropagation(); onDelete(task.id, task.title); }} className="text-slate-400 hover:text-red-500">
          <Trash2 size={13} />
        </button>
      </div>

      <div>
        <h5 className="font-medium text-sm">{task.title}</h5>
        <span className="text-[11px] text-slate-500">{task.projectName}</span>
      </div>

      <div className="flex items-center justify-between border-t pt-2 text-[11px] text-slate-500" onClick={(e) => e.stopPropagation()}>
        <span className="flex items-center gap-1"><Calendar size={12} /> {task.dueDate}</span>
        <div className="flex gap-1">
          {task.status !== 'To Do' && <button onClick={() => onUpdateStatus(task.id, 'To Do')} className="px-1.5 py-0.5 bg-slate-100 rounded">To Do</button>}
          {task.status !== 'In Progress' && <button onClick={() => onUpdateStatus(task.id, 'In Progress')} className="px-1.5 py-0.5 bg-amber-50 rounded">In Prog</button>}
          {task.status !== 'Completed' && <button onClick={() => onUpdateStatus(task.id, 'Completed')} className="px-1.5 py-0.5 bg-emerald-50 rounded">Done</button>}
        </div>
      </div>
    </div>
  );
}
