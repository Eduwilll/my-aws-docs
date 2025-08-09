import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Target,
  BookOpen,
  Star,
  AlertTriangle,
} from "lucide-react";
import type { DetailedExamResult, Question } from "@/lib/types/questions";

interface ExamDetailsProps {
  examResult: DetailedExamResult;
  questions: Question[];
  onBack: () => void;
  onToggleFavorite: (questionId: string) => void;
  isFavoriteQuestion: (questionId: string) => boolean;
}

export const ExamDetails: React.FC<ExamDetailsProps> = ({
  examResult,
  questions,
  onBack,
  onToggleFavorite,
  isFavoriteQuestion,
}) => {
  const { exam, questionAttempts, categoryBreakdown, domainBreakdown } =
    examResult;
  const score = ((exam.score || 0) / questionAttempts.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return "default";
    if (percentage >= 70) return "secondary";
    return "destructive";
  };

  const getQuestionById = (questionId: string): Question | undefined => {
    return questions.find((q) => q.id === questionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{exam.id}</h2>
          <p className="text-muted-foreground">
            {formatDate(exam.startTime)} • Modo: {exam.studySettings.mode}
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pontuação Final
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {exam.score} de {questionAttempts.length} questões
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Gasto</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exam.timeSpent
                ? `${Math.floor(exam.timeSpent / 60)}m ${exam.timeSpent % 60}s`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {exam.timeSpent
                ? `${(exam.timeSpent / questionAttempts.length).toFixed(1)}s por questão`
                : "Tempo não registrado"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questões Corretas
            </CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {questionAttempts.filter((q) => q.isCorrect).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {questionAttempts.filter((q) => q.isPartial).length} parcialmente
              corretas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questões Incorretas
            </CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {
                questionAttempts.filter((q) => !q.isCorrect && !q.isPartial)
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">Precisam de revisão</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Categoria</CardTitle>
          <CardDescription>
            Como você se saiu em cada área do exame
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryBreakdown)
              .sort(
                ([, a], [, b]) => (b?.percentage || 0) - (a?.percentage || 0),
              )
              .map(([category, stats]) => {
                if (!stats) return null;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium capitalize">
                          {category.replace("_", " ")}
                        </span>
                        <Badge variant={getScoreBadgeVariant(stats.percentage)}>
                          {stats.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {stats.correct}/{stats.total}
                      </span>
                    </div>
                    <Progress value={stats.percentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Question by Question Review */}
      <Card>
        <CardHeader>
          <CardTitle>Revisão Detalhada das Questões</CardTitle>
          <CardDescription>Análise de cada questão respondida</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questionAttempts.map((attempt, index) => {
              const question = getQuestionById(attempt.questionId);
              if (!question) return null;

              const isCorrect = attempt.isCorrect;
              const isPartial = attempt.isPartial;
              const isFavorite = isFavoriteQuestion(attempt.questionId);

              return (
                <div
                  key={attempt.questionId}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Questão {index + 1}</Badge>
                      {isCorrect && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {isPartial && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      {!isCorrect && !isPartial && (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {question.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.difficulty}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(attempt.questionId)}
                      className={
                        isFavorite ? "text-yellow-500" : "text-gray-400"
                      }
                    >
                      <Star
                        className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{question.text}</p>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-green-700">
                        Resposta(s) Correta(s):
                      </p>
                      <div className="text-xs text-green-600">
                        {attempt.correctAnswers
                          .map((answerId) => {
                            const option = question.options.find(
                              (opt) => opt.id === answerId,
                            );
                            return option
                              ? `${option.id}. ${option.text}`
                              : answerId;
                          })
                          .join("; ")}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-blue-700">
                        Sua Resposta:
                      </p>
                      <div
                        className={`text-xs ${isCorrect ? "text-green-600" : "text-red-600"}`}
                      >
                        {attempt.selectedAnswers
                          .map((answerId) => {
                            const option = question.options.find(
                              (opt) => opt.id === answerId,
                            );
                            return option
                              ? `${option.id}. ${option.text}`
                              : answerId;
                          })
                          .join("; ")}
                      </div>
                    </div>

                    {(!isCorrect || isPartial) && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        <p className="font-medium text-blue-800 mb-1">
                          Explicação:
                        </p>
                        <p className="text-blue-700">
                          {question.options.find((opt) => opt.isCorrect)
                            ?.explanation || "Explicação não disponível"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
