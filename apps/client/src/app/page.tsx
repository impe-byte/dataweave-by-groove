export default function ClientHomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-indigo-600 text-sm font-medium">
            Portale Attivo
          </span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
          DataWeave{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Client
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Carica i tuoi documenti DDT, verifica le estrazioni e scarica i file
          XML pronti per il tuo gestionale.
        </p>
      </div>
    </main>
  );
}
