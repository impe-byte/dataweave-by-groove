# DataWeave by Groove (SaaS Document AI) - Project Bible & Architecture

## 1. Vision e Obiettivo

- **Descrizione:** SaaS B2B Multitenant per l'analisi, estrazione e mappatura semantica di documenti DDT (PDF) in formato XML.
- **Target Audience:** Clienti B2B dell'azienda Groove.

## 2. Tech Stack & Infrastruttura

- **Gestione Repo:** Turborepo (NPM Workspaces)
- **Frontend:** React 18 / Next.js, Tailwind CSS
- **Backend:** Node.js
- **Database:** PostgreSQL, Prisma ORM
- **Core Engine:** TypeScript puro (Strict Mode)
- **Testing:** Vitest

## 3. Architettura e Regole d'Oro

1. **Multitenancy Ferrea:** Tutte le tabelle di dominio (Utenti, Documenti, Glossari) devono avere il campo `tenant_id`.
2. **Zero I/O Core:** Il Matcher Engine deve risiedere in un modulo puro, senza toccare DB o Rete.

## 4. Macro Fasi di Sviluppo (Stima 75h totali)

- Fase 1: Infrastruttura Core & Multitenancy (10h)
- Fase 2: UI/UX Groove Admin Portal (15h)
- Fase 3: UI/UX Client Portal & Upload (15h)
- Fase 4: Core Engine - Estrazione AI & Matcher (20h)
- Fase 5: UI Verifica Interattiva & Export XML (15h)
