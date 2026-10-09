# How to Add a New Certification / Question Bank

> Last verified: 2026-10-09. Stack: Astro + React, `vitest`, `tsc --noEmit`.

Certifications are **not** auto-discovered. You must wire the same ID in **6 files**.
Missing one = card shows `0 questões`, bank fails to load, or `domain_focus` returns `[]`.
This happened with `AIF-C01` (see fix Oct 2026).

## 1. File map (all required)

| # | File | What to add |
|---|------|-------------|
| 1 | `src/lib/types/exam-domains.ts` | `XXX_DomainMap` + `XXX_DomainDetails` + extend `ExamDomainKey` union |
| 2 | `src/data/questions-xxx.ts` | New file exporting `Question[]` |
| 3 | `src/lib/utils/questionLoader.ts` | `case` in `loadQuestionBank()` + entry in `questionBankEstimates` (+ `XXX-FULL`) |
| 4 | `src/lib/utils/examSources.ts` | Entries in `examSourceMap` for cert + each bank |
| 5 | `src/components/ExamSimulator.tsx` | `certifications[]` + `certificationBanks{}` + `getDomainMap()/getDomainDetails()` |
| 6 | `public/images/badges/` | Badge `.png` referenced by `certifications[].img` |

Known gap: `src/components/exam/ExamSelectionScreen.tsx:323-332` domain dropdown is **hardcoded to CLF-C02's 4 domains**. New certs with 5-6 domains still work (filter uses `getDomainName()`), but the dropdown label list won't show DOMAIN_5/6 until you make it dynamic.

## 2. Step-by-step (example: enabling `DVA-C02`)

### Step 1 — Domains: `src/lib/types/exam-domains.ts`

```ts
export const DVA_C02_DomainMap = {
  DOMAIN_1: "Desenvolvimento",
  DOMAIN_2: "Segurança",
  DOMAIN_3: "Deploy",
  DOMAIN_4: "Troubleshooting",
} as const;

export const DVA_C02_DomainDetails: Record<DVA_C02_DomainKey, ExamDomainInfo> = {
  DOMAIN_1: { name: "Desenvolvimento", percentage: 32, description: "..." },
  // ... one entry per DOMAIN_X
};

export type DVA_C02_DomainKey = keyof typeof DVA_C02_DomainMap;
export type ExamDomainKey =
  | CLF_C02_DomainKey | SAA_C03_DomainKey
  | DVA_C02_DomainKey /* add yours */
  | SAP_C02_DomainKey | DOP_C02_DomainKey;
```

> Note: `AIF_C01_DomainMap` exists but `AIF_C01_DomainKey` is still missing from `ExamDomainKey` — add it when you touch this file.

`dominio` in every question **must** be one of these keys, otherwise UI shows `Unknown Domain`.

### Step 2 — Data file: `src/data/questions-dva-c02.ts`

Copy `src/data/questions-clf-c02-01.ts:4-54` as template. Minimal valid question:

```ts
import type { Question } from "../lib/types/questions";

export const questionsDvaC02: Question[] = [
  {
    id: "DVA-C02-01-01", // unique across ALL banks, never reuse
    text: "Pergunta...",
    text_en: "English version...",
    type: "single_choice", // or "multiple_choice"
    options: [
      { id: "A", text: "...", isCorrect: true, explanation: "..." },
      { id: "B", text: "...", isCorrect: false, explanation: "..." },
      { id: "C", text: "...", isCorrect: false, explanation: "..." },
      { id: "D", text: "...", isCorrect: false, explanation: "..." },
    ],
    category: "compute", // must be in ExamCategory (src/lib/types/questions.ts:38-70)
    dominio: "DOMAIN_1", // must exist in your DomainMap
    difficulty: "medium", // easy | medium | hard
    references: ["https://aws.amazon.com/..."],
  },
];
```

Rules: `id` unique, every question has exactly 4 options with `A-D`, at least 1 `isCorrect: true`, `multiple_choice` needs 2+ correct.

### Step 3 — Loader: `src/lib/utils/questionLoader.ts`

Add **both** single bank and FULL (FULL is required — `domain_focus` mode builds `${cert}-FULL` in `ExamSimulator.tsx`):

```ts
case "DVA-C02-01": {
  const { questionsDvaC02 } = await import("@/data/questions-dva-c02");
  return questionsDvaC02;
}
case "DVA-C02-FULL": {
  const { questionsDvaC02 } = await import("@/data/questions-dva-c02");
  return questionsDvaC02;
}
// multi-file FULL example (see CLF-C02-FULL): Promise.all([...]) + spread
```

And estimates (display-only, but card shows `0` if missing):

```ts
export const questionBankEstimates: Record<string, number> = {
  // ...
  "DVA-C02-01": 65,
  "DVA-C02-FULL": 65,
};
```

Export name in `import` must match Step 2 exactly, else runtime `undefined`.

### Step 4 — Sources: `src/lib/utils/examSources.ts`

```ts
"DVA-C02": {
  id: "DVA-C02", name: "AWS Certified Developer – Associate",
  description: "...", questionCount: 0, primarySource: "OFFICIAL",
},
"DVA-C02-01": {
  id: "DVA-C02-01", name: "Simulado DVA-C02 01",
  description: "...", questionCount: 65, primarySource: "AI",
},
"DVA-C02-FULL": {
  id: "DVA-C02-FULL", name: "Treinamento Infinito DVA-C02",
  description: "Todas as questões misturadas.",
  questionCount: 0, primarySource: "SYSTEM",
},
```

Missing entry here = fallback `{ name: examId, questionCount: 0 }` in bank cards.

### Step 5 — Simulator: `src/components/ExamSimulator.tsx`

```ts
const certificationBanks: Record<string, string[]> = {
  "DVA-C02": ["DVA-C02-01"], // empty [] = "Em Breve" card
};

const certifications = [
  { id: "DVA-C02", title: "AWS Certified Developer – Associate",
    img: "/images/badges/AWS-Certified-Developer-Associate_badge.png" },
];
```

Then extend the domain helpers (currently only `SAA-C03` is special-cased, everything else falls back to CLF):

```ts
function getDomainMap(examId: string) {
  if (examId.startsWith("SAA-C03")) return SAA_C03_DomainMap;
  if (examId.startsWith("DVA-C02")) return DVA_C02_DomainMap;
  // if (examId.startsWith("AIF-C01")) return AIF_C01_DomainMap;
  return CLF_C02_DomainMap;
}
// same pattern for getDomainDetails()
```

### Step 6 — Badge image

Add PNG to `public/images/badges/` with the exact filename used in `img`. Check existing files there for naming. Missing file = broken image, but exam still works.

## 3. How to test

### A. Static checks (run every time)

```powershell
npx tsc --noEmit 2>&1 | Select-String -Pattern "questionLoader|ExamSelection|examSources|exam-domains|ExamSimulator"
npm run lint
```

Pre-existing failures in `src/components/__tests__/Terms*.test.tsx` (`toBeInTheDocument`, `jest-axe` types) are unrelated — only your 5 files above must be clean.

### B. Data validation (catches 90% of mistakes)

```powershell
# 1. Export name matches loader?
Select-String -Path "src/data/questions-dva-c02.ts" -Pattern "export const (\w+)"
# 2. Duplicate IDs across banks?
Select-String -Path "src/data/*.ts" -Pattern 'id:\s*"([^"]+)"' | Group-Object { $_.Matches[0].Groups[1].Value } | Where-Object { $_.Count -gt 1 }
# 3. Invalid dominio / category?
Select-String -Path "src/data/questions-dva-c02.ts" -Pattern 'dominio:\s*"([^"]+)"' | Select-Object -Unique
```

Expected: export name = what you import in Step 3, no duplicate IDs, all `dominio` in your `DomainMap`, all `category` in `ExamCategory`.

### C. Unit test (vitest)

```powershell
npm test -- src/lib/utils/questionLoader
# or full suite:
npm test
```

No dedicated `questionLoader.test.ts` exists yet — if you add one, assert:

```ts
import { loadQuestionBank, questionBankEstimates } from "@/lib/utils/questionLoader";
expect(await loadQuestionBank("DVA-C02-01")).toHaveLength(questionBankEstimates["DVA-C02-01"]);
expect(await loadQuestionBank("DVA-C02-FULL")).not.toHaveLength(0);
```

### D. Manual UI (2 min)

1. `npm run dev` → Simulador.
2. Step 1 card shows `N questões` (not `0`, not `Sem questões ainda`).
3. Step 3 bank card shows name + count + source badge.
4. Start in `Prática` → answer 1 question → explanation appears.
5. Start in `Foco Direcionado` (uses `XXX-FULL`) → must load, not `Nenhuma questão encontrada`.
6. Reload mid-exam → `Continuar Exame` dialog works.

## 4. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Card shows `0 questões disponíveis` | No `XXX-FULL` in `questionBankEstimates`; `ExamSelectionScreen` fallback sums banks | Add estimate (Step 3) |
| `Nenhuma questão encontrada` in Foco Direcionado | No `case "XXX-FULL"` in `loadQuestionBank` → returns `[]` | Add FULL case (Step 3) |
| Bank name shows raw ID / `Fonte desconhecida` | Missing `examSourceMap` entry | Add (Step 4) |
| `Unknown Domain` | `dominio` not in that cert's `DomainMap` | Fix data or `getDomainMap()` (Steps 1/5) |
| `undefined is not iterable` on start | Export name mismatch between data file and loader import | Align names (Steps 2/3) |
| Card greyed `Em Breve` | `certificationBanks["XXX"]` is `[]` | Add bank ID (Step 5) |
| Duplicate score / wrong review | Duplicate question `id` across files (`FULL` spreads merge) | Make IDs globally unique with bank prefix |
