import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white flex justify-between items-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © 2026 <b>Smart Todo App.</b> Build with Next.js & TypeScript.
        </p>
      </div>
      <div>
        <p>Made by: Shanujan</p>
      </div>
    </footer>
  );
}
