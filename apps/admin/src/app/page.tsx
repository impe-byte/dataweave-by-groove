export default function AdminHomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-indigo-300 text-sm font-medium">
            Sistema Operativo
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">
          DataWeave{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Admin
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Dashboard di gestione Groove per il monitoraggio tenant, documenti e
          sistema AI.
        </p>
      </div>
    </main>
  );
}
