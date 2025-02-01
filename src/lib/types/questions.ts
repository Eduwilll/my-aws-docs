// src/lib/types/questions.ts
export interface Question {
  id: string;
  text: string;
  type: typeChoice;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  // explanation: string;
  category: ExamCategory;
  dominio: ExamDominion;
  difficulty: "easy" | "medium" | "hard";
  references: string[];
}

export type ExamCategory =
  | "cloud-concepts"
  | "security-and-compliance"
  | "technology"
  | "billing-and-pricing"
  | "architecture-design"
  | "deployment"
  | "networking"
  | "management"
  | "security"
  | "monitoring"
  | "storage"
  | "database"
  | "compute"
  | "infrastructure"
  | "developer_tools"
  | "analytics"
  | "application_integration";

export type ExamDominion =
  | "Domínio 1: Conceitos de Nuvem"
  | "Domínio 2: Segurança e Conformidade"
  | "Domínio 3: Tecnologia"
  | "Domínio 4: Faturamento e Preços";
export type typeChoice = "single_choice" | "multiple_choice";

export interface SimulatedExam {
  id: string;
  userId: string;
  questions: string[]; // Question IDs
  answers: { [questionId: string]: string }; // Question ID -> Selected Option ID
  startTime: Date;
  endTime?: Date;
  score?: number;
  timeSpent?: number; // in minutes
}

export interface UserProgress {
  userId: string;
  examsTaken: number;
  averageScore: number;
  categoryScores: {
    [key in ExamCategory]: {
      correct: number;
      total: number;
      percentage: number;
    };
  };
  recentExams: SimulatedExam[];
}
