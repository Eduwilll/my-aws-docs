import type { Question } from "@/lib/types/questions";

/**
 * Dynamically loads a question bank by ID.
 * This enables code-splitting: question data files are NOT included in the
 * initial JS bundle and are only fetched when the user actually starts an exam.
 */
export async function loadQuestionBank(bankId: string): Promise<Question[]> {
  switch (bankId) {
    case "CLF-C02-01": {
      const { questionsClfC0201 } = await import("@/data/questions-clf-c02-01");
      return questionsClfC0201;
    }

    case "CLF-C02-02": {
      const { questionsClfC0202 } = await import("@/data/questions-clf-c02-02");
      return questionsClfC0202;
    }

    case "CLF-C02-CC-01": {
      const { questionCLFC02CC01 } = await import("@/data/CLF-C02-CC-01");
      return questionCLFC02CC01;
    }

    case "CLF-C02-GPT": {
      const { GPTquestions } = await import("@/data/questions");
      return GPTquestions;
    }

    case "CLF-C02-FULL": {
      const [
        { questions },
        { questionsClfC0201 },
        { questionsClfC0202 },
        { GPTquestions },
        { questionCLFC02CC01 },
      ] = await Promise.all([
        import("@/data/questions-clf-c02"),
        import("@/data/questions-clf-c02-01"),
        import("@/data/questions-clf-c02-02"),
        import("@/data/questions"),
        import("@/data/CLF-C02-CC-01"),
      ]);
      return [
        ...questions,
        ...questionsClfC0201,
        ...questionsClfC0202,
        ...GPTquestions,
        ...questionCLFC02CC01,
      ];
    }

    case "SAA-C03-FULL": {
      const { questionsSaaC03 } = await import("@/data/questions-saa-c03");
      return questionsSaaC03;
    }

    default:
      console.warn(`Unknown question bank ID: "${bankId}"`);
      return [];
  }
}

/**
 * Returns an approximation of the question count for display purposes
 * WITHOUT loading the full data. Used on the selection screen.
 */
export const questionBankEstimates: Record<string, number> = {
  "CLF-C02-FULL": 450, // sum of all CLF-C02 files
  "CLF-C02-01": 65,
  "CLF-C02-02": 65,
  "CLF-C02-CC-01": 65,
  "CLF-C02-GPT": 65,
  "SAA-C03-FULL": 65,
};
