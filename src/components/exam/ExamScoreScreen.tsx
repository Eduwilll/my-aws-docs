import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, RotateCcw, BarChart3 } from "lucide-react";
import type {
  Question,
  SimulatedExam,
  StudyMode,
  DetailedExamResult,
} from "@/lib/types/questions";

interface ExamScoreScreenProps {
  score: number;
  totalQuestions: number;
  studyMode: StudyMode;
  endMessage: string | null;
  simulatedExam: SimulatedExam | null;
  currentExamResult: DetailedExamResult | null;
  allAnswers: Record<
    string,
    { answers: string[]; status: "correct" | "incorrect" | "partial" | null }
  >;
  selectedSimulado: Question[];
  onResetExam: () => void;
  onRetryExam: () => void;
  onViewExamDetails: (result: DetailedExamResult) => void;
}

export function ExamScoreScreen({
  score,
  totalQuestions,
  studyMode,
  endMessage,
  simulatedExam,
  currentExamResult,
  allAnswers,
  selectedSimulado,
  onResetExam,
  onRetryExam,
  onViewExamDetails,
}: ExamScoreScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="text-center space-y-6 py-8">
      {/* Icon */}
      <div className="inline-flex p-4 bg-background text-foreground rounded-full">
        <Award className="w-12 h-12 text-blue-600" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {studyMode === "practice"
            ? "Prática Concluída!"
            : studyMode === "exam"
              ? "Exame Concluído!"
              : "Estudo Focado Concluído!"}
        </h2>
        {endMessage && <p className="text-gray-600">{endMessage}</p>}
      </div>

      {/* Score summary */}
      <div className="max-w-xs mx-auto p-6 bg-gray-50 rounded-lg">
        <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
        <p className="text-gray-600 mt-2">
          {score} corretas de {totalQuestions} questões
        </p>
        {simulatedExam?.timeSpent && (
          <p className="text-sm text-gray-500 mt-1">
            Tempo gasto: {Math.floor(simulatedExam.timeSpent / 60)}m{" "}
            {simulatedExam.timeSpent % 60}s
          </p>
        )}
      </div>

      {/* Detailed answer review (exam mode only) */}
      {studyMode === "exam" && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-lg font-semibold">Revisão das Respostas</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedSimulado.map((question, index) => {
              const userAnswer = allAnswers[question.id];
              const correctOpts = question.options.filter(
                (opt) => opt.isCorrect,
              );

              return (
                <div
                  key={question.id}
                  className="p-4 border rounded-lg text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        userAnswer?.status === "correct"
                          ? "default"
                          : "destructive"
                      }
                    >
                      Questão {index + 1}
                    </Badge>
                    <Badge variant="outline">{question.category}</Badge>
                  </div>
                  <p className="text-sm mb-2">{question.text}</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <strong>Resposta correta:</strong>{" "}
                      {correctOpts.map((opt) => opt.text).join(", ")}
                    </p>
                    {userAnswer && (
                      <p>
                        <strong>Sua resposta:</strong>{" "}
                        {userAnswer.answers
                          .map(
                            (id) =>
                              question.options.find((opt) => opt.id === id)
                                ?.text,
                          )
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Button onClick={onResetExam} variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Escolher Outro Exame
        </Button>
        <Button onClick={onRetryExam} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Tentar Novamente
        </Button>
        {currentExamResult && (
          <Button
            onClick={() => onViewExamDetails(currentExamResult)}
            variant="secondary"
            className="gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Ver Detalhes do Exame
          </Button>
        )}
      </div>
    </div>
  );
}
