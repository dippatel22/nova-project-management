import type { Member, NewTask, Project } from '../../types/nova';

type Props = {
  open: boolean;
  value: NewTask;
  setValue: (value: NewTask) => void;
  projects: Project[];
  members: Member[];
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreateTaskModal({ open, value, setValue, projects, members, onClose, onSubmit }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between border-b pb-3 mb-4"><h3 className="font-semibold">Add New Task</h3><button onClick={onClose}>✕</button></div>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-xs font-semibold">Task Title<input required value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" placeholder="e.g. Implement authentication API" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold">Project<select value={value.projectId} onChange={(e) => setValue({ ...value, projectId: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal"><option value="">Select Project</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
            <label className="text-xs font-semibold">Priority<select value={value.priority} onChange={(e) => setValue({ ...value, priority: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal"><option>Low</option><option>Medium</option><option>High</option></select></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold">Assignee<select value={value.assignee} onChange={(e) => setValue({ ...value, assignee: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal">{members.map((m) => <option key={m.id}>{m.name}</option>)}</select></label>
            <label className="text-xs font-semibold">Due Date<input type="date" value={value.dueDate} onChange={(e) => setValue({ ...value, dueDate: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" /></label>
          </div>
          <label className="block text-xs font-semibold">Description<textarea rows={2} value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" /></label>
          <div className="flex justify-end gap-2 border-t pt-3"><button type="button" onClick={onClose} className="px-4 py-2 text-xs">Cancel</button><button className="px-4 py-2 text-xs bg-slate-900 text-white rounded-lg">Save Task</button></div>
        </form>
      </div>
    </div>
  );
}
