export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        {children}
      </div>
    </main>
  );
}
