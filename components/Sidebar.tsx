import { CheckSquare, FolderKanban, LayoutDashboard, Users } from 'lucide-react';
import type { Tab } from '../types/nova';

type Props = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  projectCount: number;
  taskCount: number;
};

export default function Sidebar({ activeTab, setActiveTab, projectCount, taskCount }: Props) {
  const items = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as Tab, label: 'Projects', icon: FolderKanban, count: projectCount },
    { id: 'tasks' as Tab, label: 'Tasks & Board', icon: CheckSquare, count: taskCount },
    { id: 'team' as Tab, label: 'Team Members', icon: Users },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0">
      <div>
        <div className="flex items-center gap-3 px-3 py-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">N</div>
          <div>
            <h1 className="font-semibold">NOVA</h1>
            <p className="text-xs text-slate-500">Team Workspace</p>
          </div>
        </div>

        <nav className="space-y-1">
          {items.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === id
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} />
              {label}
              {count !== undefined && (
                <span className="ml-auto bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs">ME</div>
          <div>
            <p className="text-sm font-medium">Lead Developer</p>
            <p className="text-xs text-slate-500">active_session</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
