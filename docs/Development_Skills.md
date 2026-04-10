# DataWeave by Groove - Development Skills & Best Practices

> File generato dall'integrazione delle skill del catalogo [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills).
> Queste regole sono vincolanti per tutto il team di sviluppo.

---

## 1. Test-Driven Development (TDD)

### Regola Ferrea
```
NESSUN CODICE DI PRODUZIONE SENZA UN TEST CHE FALLISCE PRIMA
```

### Ciclo Red-Green-Refactor
1. **RED**: Scrivi un test minimale che descriva il comportamento desiderato
2. **Verifica RED**: Esegui il test — DEVE fallire per la ragione corretta
3. **GREEN**: Scrivi il codice minimo per far passare il test
4. **Verifica GREEN**: Conferma che passa + nessuna regressione
5. **REFACTOR**: Pulisci il codice mantenendo tutti i test verdi

### Comandi Vitest
```bash
# Packages
npm run test --workspace=packages/core
npm run test:watch --workspace=packages/core
npm run test:coverage --workspace=packages/core
```

### Checklist Pre-Merge
- [ ] Ogni nuova funzione/metodo ha un test
- [ ] Ogni test è stato visto fallire prima dell'implementazione
- [ ] Il codice minimo è stato scritto per far passare il test
- [ ] Tutti i test passano
- [ ] Edge case e gestione errori coperti

---

## 2. Node.js Best Practices

### Architettura a Layer (applicata al progetto)
```
apps/admin, apps/client (Controller/Route)
    ↓
packages/core (Service/Business Logic - Zero I/O)
    ↓
packages/database (Repository/Data Access)
```

### Principi Chiave
- **Validazione ai confini**: Tutti gli input validati all'ingresso dell'API
- **Error handling centralizzato**: Custom error classes, catch a livello middleware
- **Async patterns**: `Promise.all` per operazioni parallele indipendenti
- **Nessun metodo sync in produzione**: mai `fs.readFileSync` e simili
- **Secrets**: Solo variabili d'ambiente (vedi `.env.example`)

### Anti-Pattern da Evitare
- ❌ Business logic nei controller
- ❌ Skip validazione input
- ❌ Hardcode dei secrets
- ❌ Trust dati esterni senza validazione
- ❌ Blocco dell'event loop con lavoro CPU-bound

---

## 3. Prisma ORM Best Practices

### Schema Quality Checklist
- [ ] Tutti i modelli hanno `@id` con chiave primaria appropriata
- [ ] Relazioni usano `@relation` esplicito con `fields` e `references`
- [ ] Comportamenti cascade definiti (`onDelete`, `onUpdate`)
- [ ] Indici aggiunti per campi frequentemente interrogati
- [ ] Enum usati per set di valori fissi
- [ ] `@@map` usato per convenzioni di naming tabelle

### Query Patterns
```typescript
// ✅ CORRETTO: Includi relazioni per evitare N+1
const documents = await prisma.document.findMany({
  where: { tenantId },
  include: { rows: true }
});

// ✅ OTTIMALE: Select solo i campi necessari
const documents = await prisma.document.findMany({
  where: { tenantId },
  select: {
    id: true,
    status: true,
    fileName: true,
    rows: { select: { id: true, rawText: true, confidenceScore: true } }
  }
});
```

### Migration Safety
```bash
# Sviluppo
npx prisma migrate dev --name nome_descrittivo

# Produzione (MAI usare migrate dev!)
npx prisma migrate deploy
```

---

## 4. Systematic Debugging

### Le 4 Fasi (mandatorie in sequenza)

| Fase | Attività | Criterio Successo |
|------|----------|-------------------|
| 1. Root Cause | Leggi errori, riproduci, controlla modifiche | Capire COSA e PERCHÉ |
| 2. Pattern | Trova esempi funzionanti, confronta | Identificare differenze |
| 3. Hypothesis | Forma teoria, testa minimamente | Confermata o nuova ipotesi |
| 4. Implementation | Crea test, correggi, verifica | Bug risolto, test passano |

### Regola Ferrea
```
NESSUN FIX SENZA INVESTIGAZIONE ROOT CAUSE PRIMA
```

### Red Flag — STOP e torna alla Fase 1
- "Fix veloce per ora, indago dopo"
- "Provo a cambiare X e vediamo"
- "Aggiungo più modifiche insieme"
- Proporre soluzioni prima di tracciare il data flow

---

## 5. API Design Principles

### Regole per le API DataWeave
- RESTful con risorse ben definite
- Tutti gli endpoint protetti da autenticazione
- Tutti i dati filtrati per `tenant_id` (multitenancy)
- Risposte JSON standardizzate con formato errore consistente
- Paginazione per tutte le liste

---

## 6. Commit Convention

### Formato (Conventional Commits)
```
<type>(<scope>): <subject>

Tipi: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Scope: admin, client, core, database, ui, infra, docs
```

### Esempi
```
feat(core): aggiungere algoritmo similarity con Levenshtein normalizzato
fix(database): correggere indice mancante su tenantId in documents
docs(docs): aggiornare roadmap con checklist Fase 1
test(core): aggiungere test per normalizeText con caratteri accentati
```

---

> **Fonte skill originali**: `.skills-repo/skills/` (clonato da antigravity-awesome-skills)
