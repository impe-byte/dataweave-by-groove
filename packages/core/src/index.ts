/**
 * @dataweave/core - Zero I/O Matcher Engine
 *
 * REGOLA ARCHITETTURALE: Questo modulo è PURO.
 * NON deve mai importare moduli che toccano DB, rete, filesystem.
 * Riceve dati, restituisce dati. Nessun side-effect.
 */

// ─── Types ───────────────────────────────────

export interface GlossaryItem {
  readonly rawSource: string;
  readonly mappedTarget: string;
  readonly category?: string;
}

export interface MatchResult {
  readonly rawText: string;
  readonly matchedTarget: string | null;
  readonly confidenceScore: number;
  readonly glossaryItemUsed: GlossaryItem | null;
}

export interface DocumentRowInput {
  readonly rowIndex: number;
  readonly rawText: string;
  readonly fieldName?: string;
}

// ─── Document State Machine ──────────────────

export const DOCUMENT_STATES = [
  "UPLOADED",
  "EXTRACTING",
  "MAPPING",
  "REVIEW_REQUIRED",
  "COMPLETED",
  "FAILED",
] as const;

export type DocumentState = (typeof DOCUMENT_STATES)[number];

export const VALID_TRANSITIONS: Record<DocumentState, DocumentState[]> = {
  UPLOADED: ["EXTRACTING", "FAILED"],
  EXTRACTING: ["MAPPING", "FAILED"],
  MAPPING: ["REVIEW_REQUIRED", "FAILED"],
  REVIEW_REQUIRED: ["COMPLETED", "MAPPING"],
  COMPLETED: [],
  FAILED: ["UPLOADED"], // Retry
};

/**
 * Verifica se una transizione di stato è valida.
 * Funzione pura - Zero I/O.
 */
export function isValidTransition(
  from: DocumentState,
  to: DocumentState
): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}

// ─── Matcher Engine (Zero I/O) ───────────────

/**
 * Normalizza il testo per il confronto semantico.
 * Rimuove spazi extra, converte in minuscolo, strip punteggiatura.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\sàáâãäåèéêëìíîïòóôõöùúûüñç]/gi, "");
}

/**
 * Calcola la distanza di Levenshtein normalizzata (0-1).
 * 1 = match perfetto, 0 = nessuna somiglianza.
 */
export function calculateSimilarity(a: string, b: string): number {
  const na = normalizeText(a);
  const nb = normalizeText(b);

  if (na === nb) return 1;
  if (na.length === 0 || nb.length === 0) return 0;

  const maxLen = Math.max(na.length, nb.length);
  const matrix: number[][] = [];

  for (let i = 0; i <= na.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= nb.length; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= na.length; i++) {
    for (let j = 1; j <= nb.length; j++) {
      const cost = na[i - 1] === nb[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost
      );
    }
  }

  const distance = matrix[na.length]![nb.length]!;
  return 1 - distance / maxLen;
}

/**
 * Trova il miglior match nel glossario per un dato testo.
 * Funzione pura - Zero I/O.
 *
 * @param rawText - Il testo estratto dal documento DDT
 * @param glossary - L'array di voci del glossario del tenant
 * @param threshold - Soglia minima di confidenza (default: 0.6)
 * @returns Il risultato del match con confidence score
 */
export function findBestMatch(
  rawText: string,
  glossary: readonly GlossaryItem[],
  threshold: number = 0.6
): MatchResult {
  if (glossary.length === 0) {
    return {
      rawText,
      matchedTarget: null,
      confidenceScore: 0,
      glossaryItemUsed: null,
    };
  }

  let bestScore = 0;
  let bestItem: GlossaryItem | null = null;

  for (const item of glossary) {
    const score = calculateSimilarity(rawText, item.rawSource);
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (bestScore >= threshold && bestItem) {
    return {
      rawText,
      matchedTarget: bestItem.mappedTarget,
      confidenceScore: bestScore,
      glossaryItemUsed: bestItem,
    };
  }

  return {
    rawText,
    matchedTarget: null,
    confidenceScore: bestScore,
    glossaryItemUsed: null,
  };
}

/**
 * Processa un batch di righe documento contro il glossario.
 * Funzione pura - Zero I/O.
 */
export function processDocumentRows(
  rows: readonly DocumentRowInput[],
  glossary: readonly GlossaryItem[],
  threshold: number = 0.6
): MatchResult[] {
  return rows.map((row) => findBestMatch(row.rawText, glossary, threshold));
}
