"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearCurrentUser, getCurrentUser } from "@/utils/localStorage";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const userName = getCurrentUser()?.name ?? "";

  if (pathname === "/Login" || pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    clearCurrentUser();
    router.push("/Login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-indigo-700">Smart Todo</h1>
        </nav>

        {userName ? (
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 hover:text-indigo-700"
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium text-slate-700 hover:text-indigo-700"
            >
              Tasks
            </Link>
            <p className="text-sm text-slate-600">Hi, {userName}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/Login"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
