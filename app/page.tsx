'use client';

import { useNova } from '../hooks/useNova';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Projects from '../components/Projects';
import TasksBoard from '../components/TasksBoard';
import TeamMembers from '../components/TeamMembers';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import CreateTaskModal from '../components/modals/CreateTaskModal';
import InviteMemberModal from '../components/modals/InviteMemberModal';
import TaskDetailsModal from '../components/modals/TaskDetailsModal';

export default function Page() {
  const nova = useNova();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row antialiased">
      
      <Sidebar
        activeTab={nova.activeTab}
        setActiveTab={nova.setActiveTab}
        projectCount={nova.projects.length}
        taskCount={nova.tasks.length}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        <Header
          activeTab={nova.activeTab}
          searchQuery={nova.searchQuery}
          setSearchQuery={nova.setSearchQuery}
          onNewTask={() => nova.setIsTaskModalOpen(true)}
        />

        <div className="p-6 max-w-7xl w-full mx-auto">

          {/* Dashboard */}
          {nova.activeTab === 'dashboard' && (
            <Dashboard
              projects={nova.projects}
              tasks={nova.tasks}
              activities={nova.activities}
              completedTasksCount={nova.completedTasksCount}
              pendingTasksCount={nova.pendingTasksCount}
              completionRate={nova.completionRate}
              onNewProject={() => nova.setIsProjectModalOpen(true)}
            />
          )}

          {/* Projects */}
          {nova.activeTab === 'projects' && (
            <Projects
              projects={nova.projects}
              tasks={nova.tasks}
              onNewProject={() => nova.setIsProjectModalOpen(true)}
              onDeleteProject={nova.deleteProject}
            />
          )}

          {/* Tasks */}
          {nova.activeTab === 'tasks' && (
            <TasksBoard
              projects={nova.projects}
              tasks={nova.filteredTasks}
              statusFilter={nova.taskStatusFilter}
              setStatusFilter={nova.setTaskStatusFilter}
              projectFilter={nova.selectedProjectFilter}
              setProjectFilter={nova.setSelectedProjectFilter}
              onNewTask={() => nova.setIsTaskModalOpen(true)}
              onUpdateStatus={nova.updateTaskStatus}
              onDelete={nova.deleteTask}
              onSelect={nova.setActiveTaskDetails}
            />
          )}

          {/* Team */}
          {nova.activeTab === 'team' && (
            <TeamMembers
              members={nova.members}
              onInvite={() => nova.setIsMemberModalOpen(true)}
              onDeleteMember={nova.deleteMember}
            />
          )}

        </div>
      </main>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={nova.isProjectModalOpen}
        value={nova.newProject}
        setValue={nova.setNewProject}
        onClose={() => nova.setIsProjectModalOpen(false)}
        onSubmit={nova.createProject}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        open={nova.isTaskModalOpen}
        value={nova.newTask}
        setValue={nova.setNewTask}
        projects={nova.projects}
        members={nova.members}
        onClose={() => nova.setIsTaskModalOpen(false)}
        onSubmit={nova.createTask}
      />

      {/* Invite Member Modal */}
      <InviteMemberModal
        open={nova.isMemberModalOpen}
        value={nova.newMember}
        setValue={nova.setNewMember}
        onClose={() => nova.setIsMemberModalOpen(false)}
        onSubmit={nova.addMember}
      />

      {/* Task Details Modal */}
      <TaskDetailsModal
        task={nova.activeTaskDetails}
        onClose={() => nova.setActiveTaskDetails(null)}
        onDelete={nova.deleteTask}
      />

    </div>
  );
}