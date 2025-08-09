import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, Check, ChevronRight, RotateCcw, Award } from "lucide-react";

import type {
  Question,
  SimulatedExam,
  StudyMode,
  ExamCategory,
} from "@/lib/types/questions";
import type { ExamDomainKey } from "@/lib/types/exam-domains";
import {
  CLF_C02_DomainMap,
  SAA_C03_DomainMap,
  CLF_C02_DomainDetails,
  SAA_C03_DomainDetails,
} from "@/lib/types/exam-domains";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "@/components/ui/badge";

//Questions
import { questions } from "@/data/questions-clf-c02";
import { questionsClfC0201 } from "@/data/questions-clf-c02-01";
import { GPTquestions } from "@/data/questions";
import { questionsClfC0202 } from "@/data/questions-clf-c02-02";
import { questionsSaaC03 } from "@/data/questions-saa-c03";
import { questionCLFC02CC01 } from "@/data/CLF-C02-CC-01";

const ExamSimulator = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "incorrect" | "partial" | null
  >(null);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const [selectedSimulado, setSelectedSimulado] = useState<Question[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [studyMode, setStudyMode] = useState<StudyMode>("practice");
  const [selectedDomains, setSelectedDomains] = useState<ExamDomainKey[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ExamCategory[]>(
    [],
  );
  const [allAnswers, setAllAnswers] = useState<{
    [questionId: string]: {
      answers: string[];
      status: "correct" | "incorrect" | "partial" | null;
    };
  }>({});

  const simulados = {
    "CLF-C02": questions,
    "CLF-C02-01": questionsClfC0201,
    "CLF-C02-02": questionsClfC0202,
    "CLF-C02-GPT": GPTquestions,
    "CLF-C02-FULL-NOGPT": [...questions, ...questionsClfC0201],
    "CLF-C02-CC-01": questionCLFC02CC01,
    "SAA-C03": questionsSaaC03,
  };
  // Save Local Storage
  // useEffect(() => {
  //   const savedExamId = localStorage.getItem("selectedExamId");
  //   const savedSimulado = localStorage.getItem("selectedSimulado");
  //   const savedCurrentQuestionIndex = localStorage.getItem("currentQuestionIndex");
  //   const savedScore = localStorage.getItem("score");
  //   const savedTimeLeft = localStorage.getItem("timeLeft");
  //   const savedSelectedAnswers = localStorage.getItem("selectedAnswers");
  //   const activeSimulado = localStorage.getItem("isActive");

  //   if (savedExamId && savedSimulado) {
  //     setIsActive(activeSimulado === "true");
  //     setSelectedExamId(savedExamId);
  //     setSelectedSimulado(JSON.parse(savedSimulado));
  //     setCurrentQuestionIndex(Number(savedCurrentQuestionIndex) || 0);
  //     setScore(Number(savedScore) || 0);
  //     setTimeLeft(Number(savedTimeLeft) || 90 * 60);
  //     setSelectedAnswers(JSON.parse(savedSelectedAnswers) || [""]);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("isActive", isActive.toString());
  //   localStorage.setItem("selectedExamId", selectedExamId);
  //   localStorage.setItem("selectedSimulado", JSON.stringify(selectedSimulado));
  //   localStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
  //   localStorage.setItem("score", score.toString());
  //   localStorage.setItem("timeLeft", timeLeft.toString());
  //   localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  // }, [
  //   selectedExamId,
  //   selectedSimulado,
  //   currentQuestionIndex,
  //   score,
  //   timeLeft,
  //   selectedAnswers,
  // ]);

  // Get current question data
  const currentQuestion =
    selectedSimulado[currentQuestionIndex] || selectedSimulado[0];
  const currentOptions = currentQuestion?.options || [];
  const correctOptions = currentOptions.filter((option) => option.isCorrect);
  const incorrectOptions = currentOptions.filter((option) => !option.isCorrect);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && studyMode === "exam" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (studyMode === "exam" && timeLeft === 0) {
      clearInterval(interval!);
      setShowScore(true);
      setIsActive(false);
      setEndMessage(
        "O tempo acabou! Sua prova foi finalizada automaticamente.",
      );
    }
    return () => clearInterval(interval!);
  }, [isActive, timeLeft, studyMode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerToggle = (answerId: string) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(answerId)) {
        return prev.filter((id) => id !== answerId);
      } else {
        return [...prev, answerId];
      }
    });
  };

  const handleSubmitAnswers = () => {
    const correctAnswerIds = currentOptions
      .filter((option) => option.isCorrect)
      .map((option) => option.id);

    const isFullyCorrect =
      selectedAnswers.length === correctAnswerIds.length &&
      selectedAnswers.every((id) => correctAnswerIds.includes(id));

    const hasPartialCorrect =
      selectedAnswers.some((id) => correctAnswerIds.includes(id)) &&
      !isFullyCorrect;

    let currentStatus: "correct" | "incorrect" | "partial" = "incorrect";
    if (isFullyCorrect) {
      setScore(score + 1);
      currentStatus = "correct";
    } else if (hasPartialCorrect) {
      setScore(score + 0.5);
      currentStatus = "partial";
    }

    // Store answer for all modes
    setAllAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answers: selectedAnswers,
        status: currentStatus,
      },
    }));

    // Update the SimulatedExam object with the user's answer
    if (simulatedExam) {
      const updatedAnswers = {
        ...simulatedExam.answers,
        [currentQuestion.id]: selectedAnswers.join(","),
      };

      setSimulatedExam({
        ...simulatedExam,
        answers: updatedAnswers,
      });
    }

    // Show explanation immediately only in practice mode
    if (studyMode === "practice") {
      setAnswerStatus(currentStatus);
      setShowExplanation(true);
    } else {
      // In exam mode, just move to next question
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerStatus(null);
    setSelectedAnswers([]);

    if (currentQuestionIndex + 1 < selectedSimulado.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finalize the exam
      if (simulatedExam) {
        const updatedExam: SimulatedExam = {
          ...simulatedExam,
          endTime: new Date(), // Set the end time
          score: score, // Set the final score
          timeSpent: 90 * 60 - timeLeft, // Calculate time spent in minutes
        };

        setSimulatedExam(updatedExam);
        console.log("Exam Completed:", updatedExam); // Log or save the exam data
      }
      setShowScore(true);
      setIsActive(false);
      setEndMessage("Parabéns! Você finalizou a prova.");
    }
  };

  const getButtonVariant = (optionId: string) => {
    const isSelected = selectedAnswers.includes(optionId);
    const isCorrect = currentOptions.find(
      (option) => option.id === optionId,
    )?.isCorrect;

    if (!showExplanation) {
      return isSelected ? "default" : "outline";
    } else {
      if (isCorrect) {
        return "success";
      } else if (isSelected && !isCorrect) {
        return "destructive";
      } else {
        return "outline";
      }
    }
  };

  const handleExamSelection = (examId: string) => {
    console.log("examId:" + examId);
    setSelectedExamId(examId);
    const allQuestions = simulados[examId as keyof typeof simulados];
    setSelectedSimulado(filterQuestionsByStudyMode(allQuestions));
  };

  const filterQuestionsByStudyMode = (questions: Question[]): Question[] => {
    if (studyMode !== "domain_focus") {
      return questions;
    }

    return questions.filter((question) => {
      const domainMatch =
        selectedDomains.length === 0 ||
        selectedDomains.includes(question.dominio);
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(question.category);
      return domainMatch && categoryMatch;
    });
  };

  const [simulatedExam, setSimulatedExam] = useState<SimulatedExam | null>(
    null,
  );

  const startExam = () => {
    if (!selectedExamId) {
      alert("Por favor, selecione um simulado antes de começar.");
      return;
    }

    const filteredQuestions = filterQuestionsByStudyMode(
      simulados[selectedExamId as keyof typeof simulados],
    );

    if (filteredQuestions.length === 0) {
      alert("Nenhuma questão encontrada com os filtros selecionados.");
      return;
    }

    setSelectedSimulado(filteredQuestions);

    // Initialize the SimulatedExam object
    const studySettings = {
      mode: studyMode,
      selectedDomains: selectedDomains,
      selectedCategories: selectedCategories,
      timeLimit: studyMode === "exam" ? 90 : undefined,
      showImmediateFeedback: studyMode === "practice",
    };

    const newExam: SimulatedExam = {
      id: selectedExamId,
      userId: "user678",
      questions: filteredQuestions.map((q) => q.id),
      answers: {},
      startTime: new Date(),
      studySettings,
    };

    setSimulatedExam(newExam);
    setIsActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(studyMode === "exam" ? 90 * 60 : 999999); // No time limit for practice mode
    setSelectedAnswers([]);
    setShowExplanation(false);
    setEndMessage(null);
    setAllAnswers({});
  };
  const progress = ((currentQuestionIndex + 1) / selectedSimulado.length) * 100;

  const getDomainMap = (examId: string) => {
    switch (examId) {
      case "SAA-C03":
        return SAA_C03_DomainMap;
      case "CLF-C02":
      case "CLF-C02-01":
      case "CLF-C02-02":
      case "CLF-C02-GPT":
      case "CLF-C02-GPT":
      case "CLF-C02-FULL-NOGPT":
        return CLF_C02_DomainMap;
      default:
        return CLF_C02_DomainMap;
    }
  };

  const getDomainName = (examId: string, domain: string) => {
    const domainMap = getDomainMap(examId);
    return domainMap[domain as keyof typeof domainMap] || "Unknown Domain";
  };

  const getDomainDetails = (examId: string) => {
    switch (examId) {
      case "SAA-C03":
        return SAA_C03_DomainDetails;
      case "CLF-C02":
      case "CLF-C02-01":
      case "CLF-C02-02":
      case "CLF-C02-CC-01":
      case "CLF-C02-GPT":
      case "CLF-C02-FULL-NOGPT":
        return CLF_C02_DomainDetails;
      default:
        return CLF_C02_DomainDetails;
    }
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  AWS Cloud Practitioner
                </CardTitle>
                <CardDescription>
                  Exame Simulado para o certificado AWS Cloud Practitioner
                </CardDescription>
              </div>
              {isActive && studyMode === "exam" && (
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  <Timer className="w-4 h-4" />
                  <span className="font-mono font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>

            {isActive && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-sm">
                    Questão {currentQuestionIndex + 1} de{" "}
                    {selectedSimulado.length}
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {currentQuestion.category}
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      {getDomainName(selectedExamId, currentQuestion.dominio)}
                    </Badge>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardHeader>

          <CardContent className="p-6">
            {!isActive && !showScore && (
              <div className="space-y-8 py-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    Bem-vindo ao Simulador de Exame da AWS
                  </h2>
                  <p className="text-gray-500">
                    Escolha seu modo de estudo e comece a praticar
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Study Mode Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Modo de Estudo
                    </label>
                    <Select
                      onValueChange={(value: StudyMode) => setStudyMode(value)}
                      value={studyMode}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o modo de estudo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="practice">
                          Modo de Prática - Feedback imediato após cada questão
                        </SelectItem>
                        <SelectItem value="exam">
                          Modo de Exame Simulado - Cronometrado, sem feedback
                          até o final
                        </SelectItem>
                        <SelectItem value="domain_focus">
                          Foco por Domínio/Categoria - Estudo direcionado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Domain/Category Filters - Only show for domain_focus mode */}
                  {studyMode === "domain_focus" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Domínios</label>
                        <Select
                          onValueChange={(value: ExamDomainKey) => {
                            if (value && !selectedDomains.includes(value)) {
                              setSelectedDomains([...selectedDomains, value]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Adicionar domínio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DOMAIN_1">
                              Conceitos de Nuvem
                            </SelectItem>
                            <SelectItem value="DOMAIN_2">
                              Segurança e Conformidade
                            </SelectItem>
                            <SelectItem value="DOMAIN_3">Tecnologia</SelectItem>
                            <SelectItem value="DOMAIN_4">
                              Faturamento e Preços
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {selectedDomains.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedDomains.map((domain) => (
                              <Badge
                                key={domain}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() =>
                                  setSelectedDomains(
                                    selectedDomains.filter((d) => d !== domain),
                                  )
                                }
                              >
                                {getDomainName(
                                  selectedExamId || "CLF-C02",
                                  domain,
                                )}{" "}
                                ×
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Categorias
                        </label>
                        <Select
                          onValueChange={(value: ExamCategory) => {
                            if (value && !selectedCategories.includes(value)) {
                              setSelectedCategories([
                                ...selectedCategories,
                                value,
                              ]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Adicionar categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud_concepts">
                              Conceitos de Nuvem
                            </SelectItem>
                            <SelectItem value="security">Segurança</SelectItem>
                            <SelectItem value="technology">
                              Tecnologia
                            </SelectItem>
                            <SelectItem value="billing">Faturamento</SelectItem>
                            <SelectItem value="compute">Computação</SelectItem>
                            <SelectItem value="storage">
                              Armazenamento
                            </SelectItem>
                            <SelectItem value="networking">Redes</SelectItem>
                            <SelectItem value="database">
                              Banco de Dados
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {selectedCategories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() =>
                                  setSelectedCategories(
                                    selectedCategories.filter(
                                      (c) => c !== category,
                                    ),
                                  )
                                }
                              >
                                {category} ×
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Exam Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Exame</label>
                    <Select
                      onValueChange={handleExamSelection}
                      value={selectedExamId}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione seu exame" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CLF-C02">
                          Exame CLF-C02 (65 questões)
                        </SelectItem>
                        <SelectItem value="CLF-C02-01">
                          Exame CLF-C02-01 (65 questões)
                        </SelectItem>
                        <SelectItem value="CLF-C02-02">
                          Exame CLF-C02-02 (65 questões)
                        </SelectItem>
                        <SelectItem value="CLF-C02-GPT">
                          Exame CLF-C02-GPT (65 questões)
                        </SelectItem>
                        <SelectItem value="CLF-C02-FULL-NOGPT">
                          Exame Infinito (130 questões)
                        </SelectItem>
                        <SelectItem value="CLF-C02-CC-01">
                          Exame CLF-C02-CC-01 (65 questões)
                        </SelectItem>
                        <SelectItem value="SAA-C03">
                          Exame SAA-C03 (1 questão)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={startExam}
                    disabled={!selectedExamId}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    {studyMode === "practice" && "Iniciar Modo de Prática"}
                    {studyMode === "exam" && "Iniciar Exame Simulado"}
                    {studyMode === "domain_focus" && "Iniciar Estudo Focado"}
                  </Button>
                </div>
              </div>
            )}

            {isActive && !showScore && currentQuestion && (
              <div className="space-y-6">
                {/* background color: #bg-background text-foreground */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
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
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentQuestion.text}
                  </h3>
                  {currentQuestion.type === "multiple_choice" && (
                    <p className="text-sm text-blue-600 mt-2 font-medium">
                      Seleciona todas as opções corretas
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {currentOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={getButtonVariant(option.id)}
                      className="w-full justify-start text-left p-4 h-auto whitespace-normal"
                      onClick={() =>
                        !showExplanation &&
                        (currentQuestion.type === "multiple_choice"
                          ? handleAnswerToggle(option.id)
                          : setSelectedAnswers([option.id]))
                      }
                      disabled={showExplanation}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>

                {!showExplanation && selectedAnswers.length > 0 && (
                  <Button
                    onClick={handleSubmitAnswers}
                    className="w-full sm:w-auto"
                  >
                    {studyMode === "practice"
                      ? "Verificar Resposta"
                      : currentQuestionIndex === selectedSimulado.length - 1
                        ? "Finalizar Exame"
                        : "Próxima Questão"}
                  </Button>
                )}

                {showExplanation && (
                  <div className="space-y-6 bg-background text-foreground p-6 rounded-lg border">
                    <div className="flex items-center gap-2">
                      {answerStatus === "correct" && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Resposta Correta
                        </Badge>
                      )}
                      {answerStatus === "partial" && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          Parcialmente Correta
                        </Badge>
                      )}
                      {answerStatus === "incorrect" && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          Resposta Incorreta
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-green-700">
                          Respostas Corretas:
                        </h3>
                        <ul className="space-y-3">
                          {correctOptions.map((option) => (
                            <li key={option.id} className="flex gap-3">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                              <div>
                                <p className="font-medium">{option.text}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {option.explanation}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h3 className="font-semibold text-red-700">
                          Outras Opções Explicadas:
                        </h3>
                        <ul className="space-y-3">
                          {incorrectOptions.map((option) => (
                            <li key={option.id} className="space-y-1">
                              <p className="font-medium">{option.text}</p>
                              <p className="text-sm text-gray-600">
                                {option.explanation}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">References:</h4>
                      <ul className="space-y-1">
                        {currentQuestion.references.map((reference, index) => (
                          <li key={index}>
                            <a
                              href={reference}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {reference}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto"
                      // variant={
                      //   answerStatus === "correct" ? "default" : "secondary"
                      // }
                    >
                      {currentQuestionIndex === selectedSimulado.length - 1 ? (
                        "Finalizar Exame"
                      ) : (
                        <>
                          Proxima Questão
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {showScore && (
              <div className="text-center space-y-6 py-8">
                <div className="inline-flex p-4 bg-background text-foreground rounded-full">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>

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

                <div className="max-w-xs mx-auto p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600">
                    {Math.round((score / selectedSimulado.length) * 100)}%
                  </div>
                  <p className="text-gray-600 mt-2">
                    {score} corretas de {selectedSimulado.length} questões
                  </p>
                  {studyMode === "exam" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Tempo gasto: {Math.round((90 * 60 - timeLeft) / 60)}{" "}
                      minutos
                    </p>
                  )}
                </div>

                {/* Show detailed results for exam mode */}
                {studyMode === "exam" && (
                  <div className="max-w-2xl mx-auto space-y-4">
                    <h3 className="text-lg font-semibold">
                      Revisão das Respostas
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedSimulado.map((question, index) => {
                        const userAnswer = allAnswers[question.id];
                        const correctOptions = question.options.filter(
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
                              <Badge variant="outline">
                                {question.category}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{question.text}</p>
                            <div className="space-y-1 text-xs">
                              <p>
                                <strong>Resposta correta:</strong>{" "}
                                {correctOptions
                                  .map((opt) => opt.text)
                                  .join(", ")}
                              </p>
                              {userAnswer && (
                                <p>
                                  <strong>Sua resposta:</strong>{" "}
                                  {userAnswer.answers
                                    .map(
                                      (id) =>
                                        question.options.find(
                                          (opt) => opt.id === id,
                                        )?.text,
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

                <Button onClick={startExam} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Tentar Novamente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamSimulator;
