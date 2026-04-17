import type { QuestionSource } from "../types/questions";

export interface ExamSourceInfo {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  primarySource: QuestionSource;
  sourceBreakdown?: { [key in QuestionSource]?: number };
}

// Core mapping of the 3 main AWS Certifications
export const examSourceMap: { [key: string]: ExamSourceInfo } = {
  // Main Certifications (for UI Cards)
  "CLF-C02": {
    id: "CLF-C02",
    name: "AWS Certified Cloud Practitioner",
    description: "Conceitos fundamentais de nuvem e segurança da AWS",
    questionCount: 0,
    primarySource: "OFFICIAL",
  },
  "SAA-C03": {
    id: "SAA-C03",
    name: "AWS Certified Solutions Architect – Associate",
    description: "Design de arquiteturas distribuídas e resilientes na AWS",
    questionCount: 0,
    primarySource: "OFFICIAL",
  },
  "DVA-C02": {
    id: "DVA-C02",
    name: "AWS Certified Developer – Associate",
    description: "Desenvolvimento e manutenção de aplicações na AWS",
    questionCount: 0,
    primarySource: "OFFICIAL",
  },

  // Specific Question Banks
  "CLF-C02-FULL": {
    id: "CLF-C02-FULL",
    name: "Treinamento Infinito (Todas as Questões)",
    description: "Simulado com todas as questões disponíveis misturadas.",
    questionCount: 0, // dynamically calculated
    primarySource: "SYSTEM",
  },
  "CLF-C02-01": {
    id: "CLF-C02-01",
    name: "Simulado Prático 01 (65 Questões)",
    description: "Questões selecionadas para o exame CLF-C02",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-02": {
    id: "CLF-C02-02",
    name: "Simulado Prático 02 (65 Questões)",
    description: "Questões selecionadas para o exame CLF-C02",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-CC-01": {
    id: "CLF-C02-CC-01",
    name: "Simulado CC 01 (65 Questões)",
    description: "Questões no estilo do exame oficial",
    questionCount: 65,
    primarySource: "AI",
  },
  "CLF-C02-GPT": {
    id: "CLF-C02-GPT",
    name: "Simulado Gerado por GPT",
    description: "Questões extras geradas por IA",
    questionCount: 65,
    primarySource: "AI",
  },
  "SAA-C03-FULL": {
    id: "SAA-C03-FULL",
    name: "Simulado SAA-C03 Único",
    description: "Questões SAA-C03 disponíveis",
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
