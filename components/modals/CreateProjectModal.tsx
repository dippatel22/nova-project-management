import type { NewProject } from '../../types/nova';

type Props = {
  open: boolean;
  value: NewProject;
  setValue: (value: NewProject) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreateProjectModal({ open, value, setValue, onClose, onSubmit }: Props) {
  if (!open) return null;

  return (
    <Modal title="Create New Project" onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input label="Project Name" value={value.name} onChange={(name) => setValue({ ...value, name })} placeholder="e.g. Mobile App Redesign" required />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Category" value={value.category} onChange={(category) => setValue({ ...value, category })} options={['Development', 'Design', 'Marketing', 'Operations']} />
          <Input label="Deadline" type="date" value={value.deadline} onChange={(deadline) => setValue({ ...value, deadline })} />
        </div>
        <Textarea label="Description" value={value.description} onChange={(description) => setValue({ ...value, description })} placeholder="Brief summary of goals..." />
        <Actions onClose={onClose} submit="Create Project" />
      </form>
    </Modal>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"><div className="flex justify-between border-b pb-3 mb-4"><h3 className="font-semibold">{title}</h3><button type="button" onClick={onClose}>✕</button></div>{children}</div></div>;
}
function Input({ label, value, onChange, placeholder, type = 'text', required }: any) { return <label className="block text-xs font-semibold">{label}<input required={required} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full text-sm border rounded-lg p-2.5 font-normal" /></label>; }
function Select({ label, value, onChange, options }: any) { return <label className="block text-xs font-semibold">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full text-sm border rounded-lg p-2.5 font-normal">{options.map((option: string) => <option key={option}>{option}</option>)}</select></label>; }
function Textarea({ label, value, onChange, placeholder }: any) { return <label className="block text-xs font-semibold">{label}<textarea rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full text-sm border rounded-lg p-2.5 font-normal" /></label>; }
function Actions({ onClose, submit }: { onClose: () => void; submit: string }) { return <div className="flex justify-end gap-2 border-t pt-3"><button type="button" onClick={onClose} className="px-4 py-2 text-xs">Cancel</button><button type="submit" className="px-4 py-2 text-xs bg-slate-900 text-white rounded-lg">{submit}</button></div>; }
