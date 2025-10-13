
// scoring.js — lightweight, deterministic scoring for Boots quiz
export const TIE_BREAK_ORDER = ["Energy", "Balance", "Detox", "Immunity", "Beauty"];

export async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const text = await res.text();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((row) => {
    const cells = row.split(",").map((c) => c.trim());
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
}

export async function loadChoiceWeights(path = "/key_choice_weights.csv") {
  const rows = await fetchCSV(path);
  return buildChoiceIndex(rows);
}

// Build lookup: { questionId -> { optionLabel -> {sku, weight} } }
export function buildChoiceIndex(rows) {
  const idx = new Map();
  for (const r of rows) {
    const qid = String(r.QUESTION_ID || "").trim();
    const opt = String(r.OPTION || "").trim();
    const sku = String(r.SCORE_SKU || "").trim();
    const w = Number(r.WEIGHT || 1) || 1;
    if (!qid || !opt || !sku) continue;
    if (!idx.has(qid)) idx.set(qid, new Map());
    idx.get(qid).set(opt, { sku, w });
  }
  return idx;
}

// Given questions, answers, and the index, tally scores.
export function scoreAnswers({ questions, answers, weightsIndex }) {
  const scores = { Energy: 0, Balance: 0, Detox: 0, Immunity: 0, Beauty: 0 };
  if (!weightsIndex) return scores;

  for (const q of questions) {
    const val = answers[q.id];
    if (val == null) continue;

    const byQ = weightsIndex.get(q.id);
    if (!byQ) continue; // not a weighted question

    // SINGLE
    if (!Array.isArray(val)) {
      const picked = (q.answers || []).find((a) => a.id === val || a.label === val);
      const label = picked ? (picked.label ?? picked.id) : String(val);
      const m = byQ.get(label);
      if (m) scores[m.sku] = (scores[m.sku] || 0) + m.w;
      continue;
    }
    // MULTI
    for (const v of val) {
      const picked = (q.answers || []).find((a) => a.id === v || a.label === v);
      const label = picked ? (picked.label ?? picked.id) : String(v);
      const m = byQ.get(label);
      if (m) scores[m.sku] = (scores[m.sku] || 0) + m.w;
    }
  }
  return scores;
}

export function pickTopSKU(scores) {
  let best = null, bestScore = -Infinity;
  for (const sku of TIE_BREAK_ORDER) {
    const s = scores[sku] ?? 0;
    if (s > bestScore) {
      best = sku;
      bestScore = s;
    }
  }
  return best || "Energy";
}
