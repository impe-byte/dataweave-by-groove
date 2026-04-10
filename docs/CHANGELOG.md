# DataWeave by Groove - Changelog

Tutte le modifiche rilevanti al progetto sono documentate in questo file.
Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it/1.1.0/).

---

## [0.2.0] - 2026-04-10

### Completato — Fase 1: Infrastruttura Core & Multitenancy

- **Setup completato:** Turborepo v2, Next.js 14, Node.js 20+, Tailwind CSS 3.4
- **Infrastruttura completata:** PostgreSQL 16 containerizzato via Docker Compose (WSL2)
- **Database configurato:** Prisma Schema con pattern Multitenant (`tenant_id` su tutte le tabelle di dominio)
- **Pipeline di testing:** Vitest configurato e sbloccato per `core`, `ui` e `database`
- **Debugging risolti:** Fix ERESOLVE ESLint, migrazione Turbo v2 (`pipeline` → `tasks`), script NPX, sanity test

---

## [0.1.0] - 2026-04-10

### Aggiunto

- **Inizializzazione progetto DataWeave by Groove**
- Setup Monorepo con Turborepo e NPM Workspaces
- Scaffolding struttura: `apps/admin`, `apps/client`, `packages/core`, `packages/database`, `packages/ui`
- Configurazione TypeScript Strict Mode (base + per-workspace)
- Schema Prisma per PostgreSQL con multitenancy (`tenant_id`)
- Zero I/O Matcher Engine con algoritmo Levenshtein normalizzato
- Test suite Vitest per il Core Engine
- Configurazione Tailwind CSS per admin e client
- Configurazione linting (ESLint, Prettier, commitlint)
- Creazione Project Bible (`Project_Bible.md`)
- Creazione Architecture Dictionary (`docs/System_Architecture_Dictionary.md`)
- Creazione Roadmap (`docs/ROADMAP.md`)
