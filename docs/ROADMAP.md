# DataWeave by Groove - Roadmap

> Stima totale: **75 ore**
> Estratto dalla [Project Bible](../Project_Bible.md)

---

## Fase 1: Infrastruttura Core & Multitenancy (10h) ✅ COMPLETATA

- [x] Setup Turborepo e NPM Workspaces
- [x] Configurazione Prisma ORM + PostgreSQL
- [x] Schema multitenancy con `tenant_id` su tutte le tabelle di dominio
- [x] Seed iniziale con dati di test
- [x] Docker-compose per ambiente locale (WSL2)
- [x] Configurazione CI/CD base

## Fase 2: UI/UX Groove Admin Portal (15h) 🔄 IN LAVORAZIONE

- [ ] Layout principale Admin Dashboard
- [ ] Pagina gestione Tenant (CRUD)
- [ ] Pagina monitoraggio documenti globale
- [ ] Pagina dettaglio Tenant (statistiche, utilizzo AI token)
- [ ] Gestione utenti per Tenant
- [ ] Sistema di notifiche/alert

## Fase 3: UI/UX Client Portal & Upload (15h)

- [ ] Layout principale Client Portal
- [ ] Autenticazione e autorizzazione Tenant-scoped
- [ ] Pagina upload documenti DDT (PDF)
- [ ] Dashboard documenti con filtri e ricerca
- [ ] Gestione glossario (CRUD transcodifiche)
- [ ] Profilo utente e impostazioni

## Fase 4: Core Engine - Estrazione AI & Matcher (20h)

- [ ] Integrazione AI provider per estrazione testo da PDF
- [ ] Parser strutturato output AI → DocumentRow
- [ ] Zero I/O Matcher Engine (similarity scoring)
- [ ] Pipeline di processamento: UPLOADED → EXTRACTING → MAPPING
- [ ] Gestione errori e retry automatici
- [ ] Ottimizzazione performance e batch processing

## Fase 5: UI Verifica Interattiva & Export XML (15h)

- [ ] Interfaccia di verifica interattiva per DocumentRow
- [ ] Highlight Confidence Score con indicatori visivi
- [ ] Editing inline dei match suggeriti
- [ ] Approvazione/rifiuto singola riga e bulk
- [ ] Generazione XML output conforme
- [ ] Download e storicizzazione export
