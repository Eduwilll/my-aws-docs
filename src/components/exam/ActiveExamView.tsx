import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@radix-ui/react-select";
import {
  Star,
  Keyboard,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Check,
  Languages,
} from "lucide-react";
import type { Question, StudyMode } from "@/lib/types/questions";

interface ActiveExamViewProps {
  currentQuestion: Question;
  currentOptions: Question["options"];
  correctOptions: Question["options"];
  incorrectOptions: Question["options"];
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswers: string[];
  showExplanation: boolean;
  answerStatus: "correct" | "incorrect" | "partial" | null;
  studyMode: StudyMode;
  isFullscreen: boolean;
  isFavorite: boolean;
  onAnswerToggle: (optionId: string) => void;
  onSelectSingleAnswer: (optionId: string) => void;
  onSubmitAnswers: () => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSkipQuestion: () => void;
  onToggleFavorite: () => void;
  onToggleFullscreen: () => void;
  onOpenShortcuts: () => void;
  getButtonVariant: (
    optionId: string,
  ) => "default" | "outline" | "success" | "destructive";
}

export function ActiveExamView({
  currentQuestion,
  currentOptions,
  correctOptions,
  incorrectOptions,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswers,
  showExplanation,
  answerStatus,
  studyMode,
  isFullscreen,
  isFavorite,
  onAnswerToggle,
  onSelectSingleAnswer,
  onSubmitAnswers,
  onNextQuestion,
  onPreviousQuestion,
  onSkipQuestion,
  onToggleFavorite,
  onToggleFullscreen,
  onOpenShortcuts,
  getButtonVariant,
}: ActiveExamViewProps) {
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showExplanation && explanationRef.current) {
      explanationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showExplanation]);

  return (
    <div className="space-y-6">
      {/* Question header */}
      <div className="exam-header-area">
        <div className="flex items-center justify-between mb-2">
          {/* Left: Mode and difficulty badges */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {studyMode === "practice"
                ? "Modo Prática"
                : studyMode === "exam"
                  ? "Modo Exame"
                  : "Estudo Focado"}
            </Badge>
            {studyMode !== "exam" && (
              <Badge variant="secondary" className="text-xs">
                {currentQuestion.difficulty}
              </Badge>
            )}
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className={isFavorite ? "text-yellow-500" : "text-gray-400"}
              title="Adicionar aos Favoritos"
            >
              <Star className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFullscreen}
              className="text-gray-400 hover:text-gray-600"
              title={
                isFullscreen
                  ? "Minimizar (Sair do Modo Foco)"
                  : "Tela Cheia (Modo Foco)"
              }
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenShortcuts}
              className="text-gray-400 hover:text-gray-600"
              title="Atalhos do Teclado (Pressione ? para abrir)"
            >
              <Keyboard className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Question text */}
        <div className="flex items-start gap-2">
          <h3 className="text-lg font-medium text-foreground flex-1">
            {currentQuestion.text}
          </h3>
          {currentQuestion.text_en && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="max-w-md p-3 bg-white border shadow-lg"
              >
                <div className="space-y-2">
                  <p className="text-xs font-medium text-blue-600">English:</p>
                  <p className="text-lg">{currentQuestion.text_en}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {currentQuestion.type === "multiple_choice" && (
          <p className="text-sm text-blue-600 mt-2 font-medium">
            Questão de múltipla escolha: Seleciona todas as opções corretas
          </p>
        )}
      </div>

      {/* Answer options */}
      <div className="space-y-3">
        {currentOptions.map((option, index) => (
          <div key={option.id} className="relative">
            <Button
              variant={getButtonVariant(option.id) as any}
              className="w-full justify-between text-left p-4 h-auto whitespace-normal"
              onClick={() =>
                !showExplanation &&
                (currentQuestion.type === "multiple_choice"
                  ? onAnswerToggle(option.id)
                  : onSelectSingleAnswer(option.id))
              }
              disabled={showExplanation}
            >
              <span className="flex-1 pr-3">{option.text}</span>
              {!showExplanation && (
                <kbd className="kbd-shortcut font-mono">{index + 1}</kbd>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Navigation + submit buttons (before answer is submitted) */}
      {!showExplanation && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
              <kbd className="kbd-shortcut ml-1">←</kbd>
            </Button>
            <Button
              variant="outline"
              onClick={onNextQuestion}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="flex items-center gap-2"
            >
              Próxima
              <kbd className="kbd-shortcut ml-1">→</kbd>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onSubmitAnswers}
              disabled={selectedAnswers.length === 0}
              className="flex items-center gap-2"
            >
              {studyMode === "practice"
                ? "Verificar Resposta"
                : currentQuestionIndex === totalQuestions - 1
                  ? "Finalizar Exame"
                  : "Próxima Questão"}
              <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 border border-white/30 rounded">
                Enter
              </kbd>
            </Button>
            <Button
              variant="outline"
              onClick={onSkipQuestion}
              className="flex items-center gap-2"
            >
              Pular Questão
              <kbd className="kbd-shortcut ml-1">Space</kbd>
            </Button>
          </div>
        </div>
      )}

      {/* Explanation panel (after answer is submitted in practice mode) */}
      {showExplanation && (
        <div
          ref={explanationRef}
          className="space-y-6 bg-background text-foreground p-6 rounded-lg border scroll-mt-24"
        >
          <div className="flex items-center gap-2">
            {answerStatus === "correct" && (
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40">
                Resposta Correta
              </Badge>
            )}
            {answerStatus === "partial" && (
              <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40">
                Parcialmente Correta
              </Badge>
            )}
            {answerStatus === "incorrect" && (
              <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40">
                Resposta Incorreta
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {/* Correct options */}
            <div className="space-y-3">
              <h3 className="feedback-heading-correct">Respostas Corretas:</h3>
              <ul className="space-y-3">
                {correctOptions.map((option) => (
                  <li key={option.id} className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {option.text}
                      </p>
                      <p className="feedback-explanation mt-1">
                        {option.explanation}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Incorrect options */}
            <div className="space-y-3">
              <h3 className="feedback-heading-incorrect">
                Outras Opções Explicadas:
              </h3>
              <ul className="space-y-3">
                {incorrectOptions.map((option) => (
                  <li key={option.id} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <p className="font-medium flex-1 text-foreground">
                        {option.text}
                      </p>
                      {option.text_en && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 p-1 h-auto"
                            >
                              <Languages className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            className="max-w-sm p-3 bg-card border shadow-lg"
                          >
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                English:
                              </p>
                              <p className="text-sm">{option.text_en}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className="feedback-explanation">{option.explanation}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* References */}
          {currentQuestion.references?.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-muted-foreground">References:</h4>
              <ul className="space-y-1">
                {currentQuestion.references.map((reference, index) => (
                  <li key={index}>
                    <a
                      href={reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      {reference}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={onNextQuestion} className="w-full sm:w-auto">
            {currentQuestionIndex === totalQuestions - 1 ? (
              "Finalizar Exame"
            ) : (
              <>
                Proxima Questão <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
