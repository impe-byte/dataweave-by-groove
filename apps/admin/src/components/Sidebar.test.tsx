import { describe, it, expect } from "vitest";
import { t } from "@/lib/i18n";

/**
 * Test Suite: Sidebar Component
 *
 * Verifica che tutti i link di navigazione siano presenti
 * attraverso il sistema i18n. I test di rendering DOM completi
 * verranno aggiunti con il setup di jsdom/happy-dom + @testing-library/react.
 */

/** Le chiavi i18n di tutti i link attesi nella sidebar */
const EXPECTED_NAV_KEYS = [
  "sidebar.links.dashboard",
  "sidebar.links.tenants",
  "sidebar.links.documents",
  "sidebar.links.systemLogs",
];

/** I percorsi corrispondenti ai link */
const EXPECTED_HREFS = ["/", "/tenants", "/documents", "/logs"];

describe("Sidebar Component", () => {
  describe("Navigation Links - i18n Resolution", () => {
    it.each(EXPECTED_NAV_KEYS)(
      "la chiave i18n '%s' deve risolvere a una stringa non vuota",
      (key) => {
        const label = t(key);
        expect(label).toBeTruthy();
        expect(label).not.toBe(key); // non deve restituire il fallback
        expect(label.length).toBeGreaterThan(0);
      }
    );

    it("deve avere esattamente 4 link di navigazione", () => {
      expect(EXPECTED_NAV_KEYS).toHaveLength(4);
      expect(EXPECTED_HREFS).toHaveLength(4);
    });

    it("i link devono risolvere alle label italiane corrette", () => {
      expect(t("sidebar.links.dashboard")).toBe("Dashboard");
      expect(t("sidebar.links.tenants")).toBe("Gestione Tenant");
      expect(t("sidebar.links.documents")).toBe("Monitoraggio Documenti");
      expect(t("sidebar.links.systemLogs")).toBe("Log Sistema");
    });
  });

  describe("Sidebar Metadata - i18n Resolution", () => {
    it("il logo deve mostrare il nome dell'app", () => {
      expect(t("app.name")).toBe("DataWeave");
    });

    it("il logo deve mostrare il tipo di portale", () => {
      expect(t("app.adminPortal")).toBe("Admin Portal");
    });

    it("il footer deve mostrare la versione", () => {
      const version = t("sidebar.footer.version");
      expect(version).toBeTruthy();
      expect(version).toMatch(/^v\d+\.\d+\.\d+$/);
    });
  });
});
