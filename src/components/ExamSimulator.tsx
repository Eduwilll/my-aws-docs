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
import { questions } from "@/data/questions-clf-c02";
import { questionsClfC0201 } from "@/data/questions-clf-c02-01";
import { GPTquestions } from "@/data/questions";
import { questionsClfC0202 } from "@/data/questions-clf-c02-02";
import type { Question, SimulatedExam } from "@/lib/types/questions";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "@/components/ui/badge";

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

  const simulados = {
    "CLF-C02": questions,
    "CLF-C02-01": questionsClfC0201,
    "CLF-C02-02": questionsClfC0202,
    "CLF-C02-GPT": GPTquestions,
    "CLF-C02-FULL-NOGPT": [...questions, ...questionsClfC0201],
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
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval!);
      setShowScore(true);
      setEndMessage(
        "O tempo acabou! Sua prova foi finalizada automaticamente.",
      );
    }
    return () => clearInterval(interval!);
  }, [isActive, timeLeft]);

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

    if (isFullyCorrect) {
      setScore(score + 1);
      setAnswerStatus("correct");
    } else if (hasPartialCorrect) {
      setScore(score + 0.5);
      setAnswerStatus("partial");
    } else {
      setAnswerStatus("incorrect");
    }
    // Update the SimulatedExam object with the user's answer
    if (simulatedExam) {
      const updatedAnswers = {
        ...simulatedExam.answers,
        [currentQuestion.id]: selectedAnswers.join(","), // Store selected answers as a comma-separated string
      };

      setSimulatedExam({
        ...simulatedExam,
        answers: updatedAnswers,
      });
    }
    setShowExplanation(true);
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
    setSelectedSimulado(simulados[examId as keyof typeof simulados]);
  };

  const [simulatedExam, setSimulatedExam] = useState<SimulatedExam | null>(
    null,
  );

  const startExam = () => {
    if (!selectedExamId) {
      alert("Por favor, selecione um simulado antes de começar.");
      return;
    }

    // Initialize the SimulatedExam object
    const newExam: SimulatedExam = {
      id: selectedExamId, // Use the selected exam ID
      userId: "user678", // Replace with the actual user ID
      questions: selectedSimulado.map((q) => q.id), // Store question IDs
      answers: {}, // Initialize empty answers
      startTime: new Date(), // Set the start time
    };

    setSimulatedExam(newExam);
    console.log(setSimulatedExam);
    setIsActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(90 * 60);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setEndMessage(null);
  };
  const progress = ((currentQuestionIndex + 1) / selectedSimulado.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
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
              {isActive && (
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
                  <Badge variant="secondary" className="text-sm">
                    {currentQuestion.category}
                  </Badge>
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
                    Escolha seu exame e comece a praticar
                  </p>
                </div>

                <div className="max-w-sm mx-auto space-y-4">
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
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={startExam}
                    disabled={!selectedExamId}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Iniciar Exame
                  </Button>
                </div>
              </div>
            )}

            {isActive && !showScore && currentQuestion && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
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
                    Verificar Resposta
                  </Button>
                )}

                {showExplanation && (
                  <div className="space-y-6 bg-gray-50 p-6 rounded-lg border">
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
                <div className="inline-flex p-4 bg-blue-50 rounded-full">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Exam Complete!</h2>
                  {endMessage && <p className="text-gray-600">{endMessage}</p>}
                </div>

                <div className="max-w-xs mx-auto p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600">
                    {Math.round((score / selectedSimulado.length) * 100)}%
                  </div>
                  <p className="text-gray-600 mt-2">
                    {score} correct out of {selectedSimulado.length} questions
                  </p>
                </div>

                <Button onClick={startExam} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
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
