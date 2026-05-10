export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type TaskFilterType = "all" | "pending" | "completed";
