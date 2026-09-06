import { Plus, Search } from 'lucide-react';
import type { Tab } from '../types/nova';

type Props = {
  activeTab: Tab;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onNewTask: () => void;
};

export default function Header({ activeTab, searchQuery, setSearchQuery, onNewTask }: Props) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
      <h2 className="text-xl font-semibold capitalize">
        {activeTab === 'dashboard' ? 'Overview Dashboard' : activeTab}
      </h2>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            placeholder="Search tasks, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none"
          />
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center gap-2 bg-slate-900 text-white text-sm px-3.5 py-2 rounded-lg whitespace-nowrap"
        >
          <Plus size={16} /> New Task
        </button>
      </div>
    </header>
  );
}
