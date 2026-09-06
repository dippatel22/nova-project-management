import type { NewMember } from '../../types/nova';

type Props = {
  open: boolean;
  value: NewMember;
  setValue: (value: NewMember) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function InviteMemberModal({ open, value, setValue, onClose, onSubmit }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between border-b pb-3 mb-4"><h3 className="font-semibold">Add Team Member</h3><button onClick={onClose}>✕</button></div>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-xs font-semibold">Full Name<input required value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" placeholder="e.g. Jordan Taylor" /></label>
          <label className="block text-xs font-semibold">Role Title<input required value={value.role} onChange={(e) => setValue({ ...value, role: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" placeholder="e.g. QA Specialist" /></label>
          <label className="block text-xs font-semibold">Avatar URL<input value={value.avatar} onChange={(e) => setValue({ ...value, avatar: e.target.value })} className="mt-1 w-full border rounded-lg p-2.5 font-normal" placeholder="Optional image URL" /></label>
          <div className="flex justify-end gap-2 border-t pt-3"><button type="button" onClick={onClose} className="px-4 py-2 text-xs">Cancel</button><button className="px-4 py-2 text-xs bg-slate-900 text-white rounded-lg">Add Member</button></div>
        </form>
      </div>
    </div>
  );
}
