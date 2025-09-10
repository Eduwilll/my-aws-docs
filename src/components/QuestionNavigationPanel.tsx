import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  Circle,
  Minus,
  ChevronLeft,
  ChevronRight,
  List,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionStatus {
  answered: boolean;
  skipped: boolean;
  correct?: boolean | null; // Only available in practice mode after answering
}

interface QuestionNavigationPanelProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  questionStatuses: { [questionIndex: number]: QuestionStatus };
  onQuestionSelect: (index: number) => void;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  studyMode: "practice" | "exam" | "domain_focus";
  isCompact?: boolean;
}

export const QuestionNavigationPanel: React.FC<
  QuestionNavigationPanelProps
> = ({
  currentQuestionIndex,
  totalQuestions,
  questionStatuses,
  onQuestionSelect,
  onPreviousQuestion,
  onNextQuestion,
  canNavigatePrevious,
  canNavigateNext,
  studyMode,
  isCompact = false,
}) => {
  const getQuestionIcon = (index: number) => {
    const status = questionStatuses[index];

    if (!status) {
      return <Circle className="w-3 h-3" />;
    }

    if (status.skipped) {
      return <Minus className="w-3 h-3 text-yellow-500" />;
    }

    if (status.answered) {
      if (studyMode === "practice" && status.correct !== undefined) {
        return status.correct ? (
          <Check className="w-3 h-3 text-green-500" />
        ) : (
          <Circle className="w-3 h-3 text-red-500 fill-current" />
        );
      }
      return <Check className="w-3 h-3 text-blue-500" />;
    }

    return <Circle className="w-3 h-3" />;
  };

  const getQuestionVariant = (index: number) => {
    if (index === currentQuestionIndex) {
      return "default";
    }

    const status = questionStatuses[index];
    if (!status) {
      return "outline";
    }

    if (status.skipped) {
      return "secondary";
    }

    if (status.answered) {
      if (studyMode === "practice" && status.correct !== undefined) {
        return status.correct ? "default" : "destructive";
      }
      return "default";
    }

    return "outline";
  };

  const getStatusCounts = () => {
    let answered = 0;
    let skipped = 0;
    let unanswered = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const status = questionStatuses[i];
      if (!status) {
        unanswered++;
      } else if (status.skipped) {
        skipped++;
      } else if (status.answered) {
        answered++;
      } else {
        unanswered++;
      }
    }

    return { answered, skipped, unanswered };
  };

  const statusCounts = getStatusCounts();

  if (isCompact) {
    return (
      <div className="space-y-3">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousQuestion}
                disabled={!canNavigatePrevious}
                className="h-9 px-3 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
                <kbd className="hidden sm:inline ml-1 px-1.5 py-0.5 text-xs bg-white border rounded">
                  ←
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Questão anterior (Seta ←)</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-lg font-semibold">
                Questão {currentQuestionIndex + 1}
              </div>
              <div className="text-sm text-gray-500">de {totalQuestions}</div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Check className="w-3 h-3 mr-1" />
                {statusCounts.answered}
              </Badge>
              {statusCounts.skipped > 0 && (
                <Badge variant="secondary" className="text-xs">
                  <Minus className="w-3 h-3 mr-1" />
                  {statusCounts.skipped}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                <Circle className="w-3 h-3 mr-1" />
                {statusCounts.unanswered}
              </Badge>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onNextQuestion}
                disabled={!canNavigateNext}
                className="h-9 px-3 flex items-center gap-2"
              >
                <kbd className="hidden sm:inline mr-1 px-1.5 py-0.5 text-xs bg-white border rounded">
                  →
                </kbd>
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Próxima questão (Seta →)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Compact Question Grid */}
        <div className="bg-white border rounded-lg p-3">
          <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-1">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const status = questionStatuses[index];
              const isCurrent = index === currentQuestionIndex;

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={getQuestionVariant(index)}
                      size="sm"
                      onClick={() => onQuestionSelect(index)}
                      className={`h-8 w-8 p-0 text-xs font-medium relative ${
                        isCurrent ? "ring-2 ring-blue-500 ring-offset-1" : ""
                      }`}
                    >
                      {index + 1}
                      <div className="absolute -top-1 -right-1">
                        {status?.answered && (
                          <Check className="w-2 h-2 text-green-600" />
                        )}
                        {status?.skipped && (
                          <Minus className="w-2 h-2 text-yellow-600" />
                        )}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-medium">Questão {index + 1}</p>
                      <p className="text-xs">
                        {!status
                          ? "Não respondida"
                          : status.skipped
                            ? "Pulada"
                            : status.answered
                              ? studyMode === "practice" &&
                                status.correct !== undefined
                                ? status.correct
                                  ? "Correta"
                                  : "Incorreta"
                                : "Respondida"
                              : "Não respondida"}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-blue-500 font-medium">
                          Questão atual
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <List className="w-5 h-5" />
          Navegação das Questões
        </CardTitle>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-blue-500" />
            <span>Respondidas: {statusCounts.answered}</span>
          </div>
          {statusCounts.skipped > 0 && (
            <div className="flex items-center gap-1">
              <Minus className="w-3 h-3 text-yellow-500" />
              <span>Puladas: {statusCounts.skipped}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Circle className="w-3 h-3 text-gray-400" />
            <span>Restantes: {statusCounts.unanswered}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Question Grid */}
        <ScrollArea className="h-96">
          <div className="grid grid-cols-4 gap-2 p-1">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const status = questionStatuses[index];
              const isCurrent = index === currentQuestionIndex;

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={getQuestionVariant(index)}
                      size="sm"
                      onClick={() => onQuestionSelect(index)}
                      className={`h-12 w-full relative ${
                        isCurrent ? "ring-2 ring-blue-500 ring-offset-1" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {getQuestionIcon(index)}
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-medium">Questão {index + 1}</p>
                      <p className="text-xs">
                        {!status
                          ? "Não respondida"
                          : status.skipped
                            ? "Pulada"
                            : status.answered
                              ? studyMode === "practice" &&
                                status.correct !== undefined
                                ? status.correct
                                  ? "Correta"
                                  : "Incorreta"
                                : "Respondida"
                              : "Não respondida"}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-blue-500 font-medium">
                          Questão atual
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollArea>

        {/* Progress Summary */}
        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso:</span>
            <span className="font-medium">
              {Math.round(
                ((statusCounts.answered + statusCounts.skipped) /
                  totalQuestions) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((statusCounts.answered + statusCounts.skipped) /
                    totalQuestions) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="pt-2 border-t space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Atual</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-green-500" />
            <span>Respondida</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-3 h-3 text-yellow-500" />
            <span>Pulada</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 text-gray-400" />
            <span>Não respondida</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
