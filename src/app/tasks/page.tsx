"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import TaskFilter from "@/components/TaskFilter";
import TaskItem from "@/components/TaskItem";
import { Task, TaskFilterType } from "@/types";
import { getCurrentUser, getTasks, saveTasks } from "@/utils/localStorage";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(() => getTasks());
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState<TaskFilterType>("all");

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push("/Login");
    }
  }, [router]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    const title = newTaskTitle.trim();
    if (!title) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((previousTasks) => [newTask, ...previousTasks]);
    setNewTaskTitle("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask();
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== taskId));
  };

  const clearCompletedTasks = () => {
    setTasks((previousTasks) => previousTasks.filter((task) => !task.isCompleted));
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      )
      .filter((task) => {
        if (currentFilter === "pending") return !task.isCompleted;
        if (currentFilter === "completed") return task.isCompleted;
        return true;
      });
  }, [currentFilter, searchTerm, tasks]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.isCompleted).length,
    [tasks],
  );

  return (
    <section className="space-y-6">
      <div >
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add, complete, and delete your tasks below
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row"
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Type a task title and press Enter"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-400 focus:ring"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1fr_auto] md:items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-400 focus:ring"
        />
        <TaskFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <p className=" text-slate-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
          <button
            type="button"
            onClick={clearCompletedTasks}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </div>
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="rounded-lg bg-slate-100 p-4 text-center text-slate-600">
              No tasks found.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
