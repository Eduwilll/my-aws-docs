import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  TrendingDown,
  Target,
  Calendar,
  Award,
  BookOpen,
  BarChart3,
  Clock,
  Star,
} from "lucide-react";
import type { UserProgress, DetailedExamResult } from "@/lib/types/questions";

interface ProgressReportProps {
  userProgress: UserProgress;
  onViewExamDetails: (exam: DetailedExamResult) => void;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  userProgress,
  onViewExamDetails,
}) => {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exames Realizados
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress.examsTaken}</div>
            <p className="text-xs text-muted-foreground">
              {userProgress.totalQuestionsAnswered} questões respondidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pontuação Média
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getScoreColor(userProgress.averageScore)}`}
            >
              {userProgress.averageScore.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {userProgress.totalCorrectAnswers} de{" "}
              {userProgress.totalQuestionsAnswered} corretas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sequência de Estudos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProgress.studyStreak.current}
            </div>
            <p className="text-xs text-muted-foreground">
              Recorde: {userProgress.studyStreak.longest} dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questões Favoritas
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProgress.favoriteQuestions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Para revisão posterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Desempenho por Categoria
          </CardTitle>
          <CardDescription>
            Seu progresso em diferentes áreas do exame
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userProgress.categoryScores)
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

      {/* Performance by Domain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Desempenho por Domínio
          </CardTitle>
          <CardDescription>Progresso nos domínios do exame AWS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userProgress.domainScores)
              .sort(([, a], [, b]) => b.percentage - a.percentage)
              .map(([domain, stats]) => (
                <div key={domain} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{domain}</span>
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
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Weak Areas */}
      {userProgress.weakAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Áreas que Precisam de Atenção
            </CardTitle>
            <CardDescription>
              Categorias com desempenho abaixo de 70%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProgress.weakAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium capitalize">
                      {area.category.replace("_", " ")}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {area.incorrectCount} erros em {area.totalAttempts}{" "}
                      tentativas
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {(
                      ((area.totalAttempts - area.incorrectCount) /
                        area.totalAttempts) *
                      100
                    ).toFixed(1)}
                    %
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Exames Recentes
          </CardTitle>
          <CardDescription>Histórico dos seus últimos exames</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userProgress.recentExams.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Nenhum exame realizado ainda
              </p>
            ) : (
              userProgress.recentExams.map((examResult, index) => {
                const score =
                  ((examResult.exam.score || 0) /
                    examResult.questionAttempts.length) *
                  100;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {examResult.exam.id}
                        </span>
                        <Badge variant={getScoreBadgeVariant(score)}>
                          {score.toFixed(1)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {examResult.exam.studySettings.mode}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(examResult.exam.startTime)} •{" "}
                        {examResult.questionAttempts.length} questões
                        {examResult.exam.timeSpent && (
                          <>
                            {" "}
                            • {Math.floor(examResult.exam.timeSpent / 60)}m{" "}
                            {examResult.exam.timeSpent % 60}s
                          </>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewExamDetails(examResult)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
