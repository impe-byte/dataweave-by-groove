import { prisma } from "@dataweave/database";
import { t } from "@/lib/i18n";
import { createTenant } from "./actions";
import { Button } from "@dataweave/ui";

export default async function TenantsPage() {
  // Fetch from the actual Database using Prisma Client
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* ── Header & Actions ──────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {t("tenants.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {t("tenants.subtitle")}
          </p>
        </div>
      </div>

      {/* ── Form Nuova Creazione ────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="text-sm font-medium text-slate-900">
            {t("tenants.add.button")}
          </h2>
        </div>
        <div className="p-4">
          <form action={createTenant} className="flex max-w-sm items-center gap-3">
            <input
              type="text"
              name="name"
              required
              placeholder={t("tenants.add.placeholder")}
              className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <Button type="submit" size="sm">
              {t("tenants.add.save")}
            </Button>
          </form>
        </div>
      </div>

      {/* ── Data-Dense Table ────────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("tenants.columns.name")}
              </th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("tenants.columns.status")}
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("tenants.columns.tokens")}
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("tenants.columns.createdAt")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50/50">
                <td className="whitespace-nowrap px-4 py-2 text-[13px] font-medium text-slate-900">
                  {tenant.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    tenant.subscriptionStatus === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {tenant.subscriptionStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right text-[13px] text-slate-600 font-mono">
                  {tenant.aiTokenUsage.toLocaleString("it-IT")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right text-[13px] text-slate-500">
                  {new Date(tenant.createdAt).toLocaleDateString("it-IT")}
                </td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                  {t("common.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
