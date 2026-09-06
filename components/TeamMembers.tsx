import { UserPlus, Trash2 } from 'lucide-react';
import type { Member } from '../types/nova';

type Props = {
  members: Member[];
  onInvite: () => void;
  onDeleteMember: (memberId: string) => void;
};

export default function TeamMembers({
  members,
  onInvite,
  onDeleteMember,
}: Props) {
  const handleDelete = (member: Member) => {
    const confirmed = confirm(
      `Are you sure you want to remove ${member.name} from the team?`
    );

    if (confirmed) {
      onDeleteMember(member.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Team Directory</h3>
          <p className="text-xs text-slate-500">
            Collaborators assigned to project tasks
          </p>
        </div>

        <button
          onClick={onInvite}
          className="flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <UserPlus size={16} />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white border rounded-xl p-5 flex flex-col items-center text-center gap-3"
          >
            {/* Avatar */}
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center font-semibold">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Member information */}
            <div>
              <h4 className="font-semibold text-sm">{member.name}</h4>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>

            {/* Status */}
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">
              Active Member
            </span>

            {/* Delete button */}
            <button
              onClick={() => handleDelete(member)}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs font-medium mt-1"
            >
              <Trash2 size={14} />
              Remove Member
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}