import type { QuestionSource } from "../types/questions";

export interface ExamSourceInfo {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  primarySource: QuestionSource;
  sourceBreakdown?: { [key in QuestionSource]?: number };
}

// Simple mapping of exam IDs to their source information
export const examSourceMap: { [key: string]: ExamSourceInfo } = {
  "CLF-C02": {
    id: "CLF-C02",
    name: "Exame CLF-C02",
    description: "Questões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-01": {
    id: "CLF-C02-01",
    name: "Exame CLF-C02-01",
    description: "Questões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-02": {
    id: "CLF-C02-02",
    name: "Exame CLF-C02-02",
    description: "QQuestões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-GPT": {
    id: "CLF-C02-GPT",
    name: "Exame CLF-C02-GPT",
    description: "Questões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-FULL-NOGPT": {
    id: "CLF-C02-FULL-NOGPT",
    name: "Exame Infinito",
    description: "Questões geradas por IA",
    questionCount: 130,
    primarySource: "AI",
  },
  "CLF-C02-CC-01": {
    id: "CLF-C02-CC-01",
    name: "Exame CLF-C02-CC-01",
    description: "Questões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "SAA-C03": {
    id: "SAA-C03",
    name: "Exame SAA-C03",
    description: "Questões geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
};

export const getExamSourceInfo = (examId: string): ExamSourceInfo => {
  return (
    examSourceMap[examId] || {
      id: examId,
      name: examId,
      description: "Fonte desconhecida",
      questionCount: 0,
      primarySource: "SYSTEM",
    }
  );
};

export const getSourceLabel = (source: QuestionSource): string => {
  const labels: { [key in QuestionSource]: string } = {
    OFFICIAL: "Oficial",
    USER: "Usuário",
    AI: "IA",
    INSTRUCTOR: "Instrutor",
    SYSTEM: "Sistema",
    IMPORTED: "Importado",
  };
  return labels[source];
};

export const getSourceColor = (source: QuestionSource): string => {
  const colors: { [key in QuestionSource]: string } = {
    OFFICIAL: "bg-green-100 text-green-700 border-green-200",
    USER: "bg-blue-100 text-blue-700 border-blue-200",
    AI: "bg-purple-100 text-purple-700 border-purple-200",
    INSTRUCTOR: "bg-orange-100 text-orange-700 border-orange-200",
    SYSTEM: "bg-gray-100 text-gray-700 border-gray-200",
    IMPORTED: "bg-cyan-100 text-cyan-700 border-cyan-200",
  };
  return colors[source];
};

export const getSourceIcon = (source: QuestionSource): string => {
  const icons: { [key in QuestionSource]: string } = {
    OFFICIAL: "🏛️",
    USER: "👤",
    AI: "🤖",
    INSTRUCTOR: "👨‍🏫",
    SYSTEM: "⚙️",
    IMPORTED: "📥",
  };
  return icons[source];
};
