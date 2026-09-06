export type Tab = 'dashboard' | 'projects' | 'tasks' | 'team';

export type Project = {
  id: string;
  name: string;
  description: string;
  category: string;
  deadline: string;
  status: string;
  progress: number;
  createdAt: number;
};

export type Task = {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  priority: string;
  assignee: string;
  dueDate: string;
  status: string;
  description: string;
  createdAt: number;
};

export type Activity = {
  id: string;
  action: string;
  details: string;
  user: string;
  createdAt: number;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export type NewProject = {
  name: string;
  description: string;
  category: string;
  deadline: string;
};

export type NewTask = {
  title: string;
  projectId: string;
  priority: string;
  assignee: string;
  dueDate: string;
  description: string;
};

export type NewMember = {
  name: string;
  role: string;
  avatar: string;
};
