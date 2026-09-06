import type { Task } from '../../types/nova';

type Props = {
  task: Task | null;
  onClose: () => void;
  onDelete: (id: string, title: string) => void;
};

export default function TaskDetailsModal({ task, onClose, onDelete }: Props) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between border-b pb-3 mb-4">
          <div><span className="text-[10px] text-slate-500 uppercase">{task.projectName}</span><h3 className="font-semibold text-lg">{task.title}</h3></div>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg text-xs">
          <Info label="Status" value={task.status} />
          <Info label="Priority" value={task.priority} />
          <Info label="Assignee" value={task.assignee} />
          <Info label="Due Date" value={task.dueDate} />
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-xs mb-1">Description</h4>
          <p className="text-sm text-slate-600 border rounded-lg p-3">{task.description || 'No detailed instructions added.'}</p>
        </div>

        <div className="flex justify-between mt-4 border-t pt-3">
          <button onClick={() => { onDelete(task.id, task.title); onClose(); }} className="text-xs text-red-600">Delete Task</button>
          <button onClick={onClose} className="px-4 py-1.5 text-xs bg-slate-900 text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><span className="text-slate-400 block">{label}</span><span className="font-medium">{value}</span></div>;
}
