import { t } from "@/lib/i18n";

/**
 * Dati placeholder per le card della dashboard.
 * In produzione questi dati verranno da API calls aggregate (non tenant-scoped).
 */
const DASHBOARD_CARDS = [
  {
    key: "activeTenants",
    labelKey: "dashboard.cards.activeTenants.label",
    descKey: "dashboard.cards.activeTenants.description",
    value: "12",
    trend: "+2",
    trendUp: true,
    accentColor: "indigo" as const,
  },
  {
    key: "processedDocuments",
    labelKey: "dashboard.cards.processedDocuments.label",
    descKey: "dashboard.cards.processedDocuments.description",
    value: "1.847",
    trend: "+124",
    trendUp: true,
    accentColor: "emerald" as const,
  },
  {
    key: "systemErrors",
    labelKey: "dashboard.cards.systemErrors.label",
    descKey: "dashboard.cards.systemErrors.description",
    value: "3",
    trend: "-5",
    trendUp: false,
    accentColor: "amber" as const,
  },
] as const;

const ACCENT_STYLES = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    bar: "bg-indigo-600",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-600",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-600",
  },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {t("dashboard.welcome.title")}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {t("dashboard.welcome.subtitle")}
        </p>
      </div>

      {/* ── Status Bar ──────────────────────── */}
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium text-slate-600">
          {t("dashboard.status.operational")}
        </span>
        <span className="text-xs text-slate-400">·</span>
        <span className="text-xs text-slate-400">
          {t("common.lastUpdated")}: 10 Apr 2026, 15:30
        </span>
      </div>

      {/* ── Metric Cards ────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_CARDS.map((card) => {
          const styles = ACCENT_STYLES[card.accentColor];
          return (
            <div
              key={card.key}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Accent bar top */}
              <div className={`h-1 ${styles.bar}`} />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {t(card.labelKey)}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                      {card.value}
                    </p>
                  </div>

                  {/* Trend Badge */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${styles.badge}`}
                  >
                    {card.trendUp ? "↑" : "↓"} {card.trend}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  {t(card.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
