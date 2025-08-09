// src/lib/types/questions.ts
import type { ExamDomainKey } from "./exam-domains";

export interface Question {
  id: string;
  text: string;
  text_en?: string;
  type: typeChoice;
  options: {
    id: string;
    text: string;
    text_en?: string;
    isCorrect: boolean;
    explanation: string;
    explanation_en?: string;
  }[];
  // explanation: string;
  category: ExamCategory;
  dominio: ExamDomainKey;
  difficulty: "easy" | "medium" | "hard";
  references: string[];
}

export type ExamCategory =
  | "cloud-concepts"
  | "cloud_concepts"
  | "security-and-compliance"
  | "technology"
  | "billing"
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
  | "application_integration"
  | "machine-learning"
  | "devops"
  | "support"
  | "management_governance"
  | "migration_transfer"
  | "serverless"
  | "containers";

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
