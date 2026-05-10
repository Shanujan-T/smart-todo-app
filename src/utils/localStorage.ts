import { Task, User } from "@/types";

const STORAGE_KEYS = {
  tasks: "smart_todo_tasks",
  users: "smart_todo_users",
  currentUser: "smart_todo_current_user",
} as const;

const isBrowser = () => typeof window !== "undefined";

const readFromStorage = <T>(key: string, fallback: T): T => {
  if (!isBrowser()) return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const writeToStorage = <T>(key: string, value: T) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getTasks = () => readFromStorage<Task[]>(STORAGE_KEYS.tasks, []);

export const saveTasks = (tasks: Task[]) => writeToStorage(STORAGE_KEYS.tasks, tasks);

export const getUsers = () => readFromStorage<User[]>(STORAGE_KEYS.users, []);

export const addUser = (user: User) => {
  const users = getUsers();
  writeToStorage(STORAGE_KEYS.users, [...users, user]);
};

export const setCurrentUser = (user: User) =>
  writeToStorage(STORAGE_KEYS.currentUser, user);

export const getCurrentUser = () =>
  readFromStorage<User | null>(STORAGE_KEYS.currentUser, null);

export const clearCurrentUser = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEYS.currentUser);
};
