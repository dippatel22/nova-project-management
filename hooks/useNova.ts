import { useMemo, useState } from 'react';
import { DEFAULT_MEMBERS } from '../data/members';
import { addMember as addMemberCrud, createProject as createProjectCrud, createTask as createTaskCrud, deleteProject as deleteProjectCrud, deleteTask as deleteTaskCrud, updateTaskStatus as updateTaskStatusCrud } from '../lib/crud';
import { makeActivity } from '../lib/activity';
import type { Activity, Member, NewMember, NewProject, NewTask, Project, Tab, Task } from '../types/nova';
import { deleteMember as deleteMemberCrud } from "@/lib/crud";

const EMPTY_PROJECT: NewProject = {
  name: '',
  description: '',
  category: 'Development',
  deadline: '',
};

const EMPTY_TASK: NewTask = {
  title: '',
  projectId: '',
  priority: 'Medium',
  assignee: 'Alex Rivera',
  dueDate: '',
  description: '',
};

const EMPTY_MEMBER: NewMember = {
  name: '',
  role: '',
  avatar: '',
};

export function useNova() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('all');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [activeTaskDetails, setActiveTaskDetails] = useState<Task | null>(null);

  const [newProject, setNewProject] = useState<NewProject>(EMPTY_PROJECT);
  const [newTask, setNewTask] = useState<NewTask>(EMPTY_TASK);
  const [newMember, setNewMember] = useState<NewMember>(EMPTY_MEMBER);

  const logActivity = (action: string, details: string) => {
    setActivities((previous) => [makeActivity(action, details), ...previous]);
  };

  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newProject.name.trim()) return;

    const project = createProjectCrud(newProject);
    setProjects((previous) => [...previous, project]);
    logActivity('created project', project.name);
    setNewProject(EMPTY_PROJECT);
    setIsProjectModalOpen(false);
  };

  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;

    const task = createTaskCrud(newTask, projects);
    setTasks((previous) => [...previous, task]);
    logActivity('added task', `"${task.title}" to ${task.projectName}`);
    setNewTask(EMPTY_TASK);
    setIsTaskModalOpen(false);
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks((previous) => updateTaskStatusCrud(previous, taskId, newStatus));
    setActiveTaskDetails((previous) =>
      previous?.id === taskId ? { ...previous, status: newStatus } : previous,
    );
    logActivity('updated status', `Task marked as ${newStatus}`);
  };

  const deleteTask = (taskId: string, taskTitle: string) => {
    setTasks((previous) => deleteTaskCrud(previous, taskId));
    setActiveTaskDetails((previous) => (previous?.id === taskId ? null : previous));
    logActivity('deleted task', taskTitle);
  };

  const deleteProject = (projectId: string, projectName: string) => {
    setProjects((previousProjects) => {
      const result = deleteProjectCrud(previousProjects, tasks, projectId);
      setTasks(result.tasks);
      return result.projects;
    });
    logActivity('deleted project', projectName);
  };

  const addMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newMember.name.trim() || !newMember.role.trim()) return;

    setMembers((previous) => addMemberCrud(previous, newMember));
    setNewMember(EMPTY_MEMBER);
    setIsMemberModalOpen(false);
    logActivity('added team member', newMember.name);
  };
  const deleteMember = (memberId: string) => {
  setMembers((currentMembers) =>
    deleteMemberCrud(currentMembers, memberId)
  );
};

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.status === 'Completed').length,
    [tasks],
  );

  const pendingTasksCount = useMemo(
    () => tasks.filter((task) => task.status !== 'Completed').length,
    [tasks],
  );

  const completionRate = tasks.length
    ? Math.round((completedTasksCount / tasks.length) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.projectName.toLowerCase().includes(query);

      const matchesProject =
        selectedProjectFilter === 'all' ||
        task.projectId === selectedProjectFilter;

      const matchesStatus =
        taskStatusFilter === 'all' ||
        task.status === taskStatusFilter;

      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [tasks, searchQuery, selectedProjectFilter, taskStatusFilter]);

  return {
    activeTab,
    setActiveTab,
    projects,
    tasks,
    activities,
    members,
    searchQuery,
    setSearchQuery,
    selectedProjectFilter,
    setSelectedProjectFilter,
    taskStatusFilter,
    setTaskStatusFilter,
    isProjectModalOpen,
    setIsProjectModalOpen,
    isTaskModalOpen,
    setIsTaskModalOpen,
    isMemberModalOpen,
    setIsMemberModalOpen,
    activeTaskDetails,
    setActiveTaskDetails,
    newProject,
    setNewProject,
    newTask,
    setNewTask,
    newMember,
    setNewMember,
    createProject,
    createTask,
    updateTaskStatus,
    deleteTask,
    deleteProject,
    addMember,
    completedTasksCount,
    pendingTasksCount,
    completionRate,
    filteredTasks,
    deleteMember,
  };
}
