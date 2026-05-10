import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="flex items-center gap-10 mt-6 inline-flex ">
        <Link href="/" className="hover:text-indigo-700 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-300">
          Go Home
        </Link>
        <Link href="/tasks" className="hover:text-indigo-700 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-300">
          View Tasks
        </Link>
      </div>
    </section>
  );
}
