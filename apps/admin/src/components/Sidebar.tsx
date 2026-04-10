"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";

/**
 * Definizione dei link di navigazione.
 * Le label provengono dal dizionario i18n.
 */
const NAV_ITEMS = [
  {
    href: "/",
    labelKey: "sidebar.links.dashboard",
    icon: DashboardIcon,
  },
  {
    href: "/tenants",
    labelKey: "sidebar.links.tenants",
    icon: TenantsIcon,
  },
  {
    href: "/documents",
    labelKey: "sidebar.links.documents",
    icon: DocumentsIcon,
  },
  {
    href: "/logs",
    labelKey: "sidebar.links.systemLogs",
    icon: LogsIcon,
  },
] as const;

// ─── SVG Icon Components (inline, minimali) ──────────

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function TenantsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DocumentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function LogsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

// ─── Sidebar Component ───────────────────────────────

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-slate-300"
      role="navigation"
      aria-label={t("sidebar.navigation")}
    >
      {/* ── Logo ──────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <span className="text-sm font-bold text-white">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white leading-tight">
            {t("app.name")}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {t("app.adminPortal")}
          </span>
        </div>
      </div>

      {/* ── Navigation Links ──────────────────── */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {t("sidebar.navigation")}
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`nav-${item.href.replace("/", "") || "dashboard"}`}
              className={`
                group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                transition-all duration-150
                ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }
              `}
            >
              <item.icon
                className={`h-[18px] w-[18px] flex-shrink-0 ${
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"
                }`}
              />
              {t(item.labelKey)}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ────────────────────────────── */}
      <div className="border-t border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-600">
            {t("sidebar.footer.version")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("sidebar.footer.environment")}
          </span>
        </div>
      </div>
    </aside>
  );
}
