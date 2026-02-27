import { User } from "./user.model";

export type TaskStatus = 'backlog' | 'new' | 'active' | 'impediment' | 'closed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatus;
  categoryId?: number;
  priority?: TaskPriority;
  dueDate?: string;
  assignee?: TaskAssignment;
}

export interface TaskAssignment {
  user: User;
  imageUrl?: string;
}

export class TaskModel implements Task {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatus;
  categoryId?: number;
  priority?: TaskPriority;
  dueDate?: string;
  assignee?: TaskAssignment;

  constructor(task: Omit<Task, 'id'>) {
    this.id = TaskModel.generateId();
    Object.assign(this, task);
  }

  private static generateId(): string {
    const numbers = Math.floor(1000000 + Math.random() * 9000000);
    const letters = Array.from({ length: 2 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    return `${numbers}${letters}`;
  }
 }

