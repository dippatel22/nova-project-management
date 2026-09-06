import type { Member, NewMember, NewProject, NewTask, Project, Task } from '../types/nova';

export function createProject(input: NewProject): Project {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description,
    category: input.category,
    deadline: input.deadline || '2026-12-31',
    status: 'In Progress',
    progress: 0,
    createdAt: Date.now(),
  };
}

export function createTask(
  input: NewTask,
  projects: Project[],
): Task {
  const project = projects.find((item) => item.id === input.projectId) ?? projects[0];

  return {
    id: crypto.randomUUID(),
    title: input.title,
    projectId: project?.id ?? 'general',
    projectName: project?.name ?? 'General Task',
    priority: input.priority,
    assignee: input.assignee,
    dueDate: input.dueDate || 'Today',
    status: 'To Do',
    description: input.description,
    createdAt: Date.now(),
  };
}

export function updateTaskStatus(tasks: Task[], taskId: string, status: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, status } : task,
  );
}

export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function deleteProject(
  projects: Project[],
  tasks: Task[],
  projectId: string,
): { projects: Project[]; tasks: Task[] } {
  return {
    projects: projects.filter((project) => project.id !== projectId),
    tasks: tasks.filter((task) => task.projectId !== projectId),
  };
}

export function addMember(members: Member[], input: NewMember): Member[] {
  return [
    ...members,
    {
      id: crypto.randomUUID(),
      name: input.name,
      role: input.role,
      avatar: input.avatar,
    },
  ];
}

export function deleteMember(
  members: Member[],
  memberId: string
): Member[] {
  return members.filter((member) => member.id !== memberId);
}