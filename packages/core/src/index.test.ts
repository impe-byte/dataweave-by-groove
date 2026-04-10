/**
 * @dataweave/core - Test Suite per il Matcher Engine
 *
 * Test del modulo Zero I/O.
 * Questi test verificano la logica pura senza mock di DB/rete.
 */

import { describe, it, expect } from "vitest";
import {
  normalizeText,
  calculateSimilarity,
  findBestMatch,
  processDocumentRows,
  isValidTransition,
  type GlossaryItem,
} from "./index";

// ─── normalizeText ───────────────────────────

describe("normalizeText", () => {
  it("converte in minuscolo e rimuove spazi extra", () => {
    expect(normalizeText("  HELLO   WORLD  ")).toBe("hello world");
  });

  it("preserva i caratteri accentati", () => {
    expect(normalizeText("Caffè Latte")).toBe("caffè latte");
  });

  it("gestisce una stringa vuota", () => {
    expect(normalizeText("")).toBe("");
  });
});

// ─── calculateSimilarity ────────────────────

describe("calculateSimilarity", () => {
  it("restituisce 1 per stringhe identiche", () => {
    expect(calculateSimilarity("test", "test")).toBe(1);
  });

  it("restituisce 1 per stringhe identiche case-insensitive", () => {
    expect(calculateSimilarity("Test", "test")).toBe(1);
  });

  it("restituisce 0 per stringa vuota vs non vuota", () => {
    expect(calculateSimilarity("", "test")).toBe(0);
  });

  it("restituisce un valore tra 0 e 1 per stringhe simili", () => {
    const score = calculateSimilarity("kitten", "sitting");
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(1);
  });
});

// ─── findBestMatch ──────────────────────────

describe("findBestMatch", () => {
  const glossary: GlossaryItem[] = [
    { rawSource: "Bulloni M8x50", mappedTarget: "BLN-M8-50" },
    { rawSource: "Viti autofilettanti 4x30", mappedTarget: "VIT-AF-4-30" },
    { rawSource: "Rondelle piane 8mm", mappedTarget: "RND-P-8" },
  ];

  it("trova un match esatto", () => {
    const result = findBestMatch("Bulloni M8x50", glossary);
    expect(result.confidenceScore).toBe(1);
    expect(result.matchedTarget).toBe("BLN-M8-50");
  });

  it("trova un match case-insensitive", () => {
    const result = findBestMatch("bulloni m8x50", glossary);
    expect(result.confidenceScore).toBe(1);
    expect(result.matchedTarget).toBe("BLN-M8-50");
  });

  it("restituisce null se nessun match supera la soglia", () => {
    const result = findBestMatch("Prodotto completamente diverso", glossary, 0.9);
    expect(result.matchedTarget).toBeNull();
  });

  it("restituisce null per un glossario vuoto", () => {
    const result = findBestMatch("qualcosa", []);
    expect(result.matchedTarget).toBeNull();
    expect(result.confidenceScore).toBe(0);
  });
});

// ─── processDocumentRows ────────────────────

describe("processDocumentRows", () => {
  const glossary: GlossaryItem[] = [
    { rawSource: "Bulloni M8x50", mappedTarget: "BLN-M8-50" },
  ];

  it("processa un batch di righe", () => {
    const rows = [
      { rowIndex: 0, rawText: "Bulloni M8x50" },
      { rowIndex: 1, rawText: "Prodotto sconosciuto" },
    ];

    const results = processDocumentRows(rows, glossary);
    expect(results).toHaveLength(2);
    expect(results[0]!.matchedTarget).toBe("BLN-M8-50");
  });
});

// ─── Document State Machine ─────────────────

describe("isValidTransition", () => {
  it("permette UPLOADED -> EXTRACTING", () => {
    expect(isValidTransition("UPLOADED", "EXTRACTING")).toBe(true);
  });

  it("blocca COMPLETED -> EXTRACTING", () => {
    expect(isValidTransition("COMPLETED", "EXTRACTING")).toBe(false);
  });

  it("permette il retry: FAILED -> UPLOADED", () => {
    expect(isValidTransition("FAILED", "UPLOADED")).toBe(true);
  });
});
