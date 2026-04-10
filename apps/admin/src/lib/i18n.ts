/**
 * i18n Mock Helper — DataWeave Admin
 *
 * Funzione temporanea `t()` che risolve chiavi dot-notation
 * dal dizionario italiano. Verrà sostituita da react-i18next
 * in una fase successiva.
 *
 * REGOLA DAY 0: Mai stringhe hardcoded nei TSX.
 * Usare sempre `t("sidebar.links.dashboard")`.
 */

import adminLocale from "../locales/it/admin.json";

type NestedRecord = { [key: string]: string | NestedRecord };

function resolveKey(obj: NestedRecord, path: string): string {
  const keys = path.split(".");
  let current: string | NestedRecord = obj;

  for (const key of keys) {
    if (typeof current === "string" || current === undefined) {
      return path; // fallback: restituisce la chiave stessa
    }
    current = current[key] as string | NestedRecord;
  }

  if (typeof current === "string") {
    return current;
  }

  return path; // fallback
}

/**
 * Funzione di traduzione mock.
 * Accetta chiavi dot-notation e restituisce la stringa dal dizionario italiano.
 *
 * @example t("sidebar.links.dashboard") → "Dashboard"
 * @example t("dashboard.cards.activeTenants.label") → "Tenant Attivi"
 */
export function t(key: string): string {
  return resolveKey(adminLocale as unknown as NestedRecord, key);
}
