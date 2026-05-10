"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getCurrentUser, getTasks } from "@/utils/localStorage";

export default function HomePage() {
  const currentUser = getCurrentUser();
  const allTasks = getTasks();
  const userName = currentUser?.name ?? "Guest";
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.isCompleted).length;

  const pendingTasks = useMemo(
    () => Math.max(totalTasks - completedTasks, 0),
    [completedTasks, totalTasks],
  );

  const progress = useMemo(() => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [completedTasks, totalTasks]);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold sm:text-3xl text-center">
          Welcome, {userName}
        </h1>
        <p className="mt-2 text-slate-600 text-center">
          Stay organized. Stay productive. One task at a time.
        </p>
        <div className="flex justify-center">
        <Link
          href="/tasks"
          className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 text-center"
        >
          Manage Tasks
        </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <p className="mt-2 text-3xl font-bold">{totalTasks}</p>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">
            {pendingTasks}
          </p>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {completedTasks}
          </p>
        </article>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Add Task Quickly</h2>
        <div className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <p>Type your task and press Enter It's that simple</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Filter with Ease</h2>
        <div className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <p>Switch between All, Pending, and Completed views instantly</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Saved Automatically</h2>
        <div className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <p>All your tasks are stored in localStorage</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Fully Resposive</h2>
        <div className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <p>Work beautifully on desktop, tablet, and mobile</p>
        </div>
      </div>
    </section>
  );
}
