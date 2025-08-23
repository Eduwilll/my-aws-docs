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
import {
  Timer,
  Check,
  ChevronRight,
  RotateCcw,
  Award,
  Star,
  BarChart3,
  BookOpen,
  Keyboard,
} from "lucide-react";

import type {
  Question,
  SimulatedExam,
  StudyMode,
  ExamCategory,
  DetailedExamResult,
  QuestionAttempt,
} from "@/lib/types/questions";
import type { ExamDomainKey } from "@/lib/types/exam-domains";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ProgressReport } from "@/components/ProgressReport";
import { ExamDetails } from "@/components/ExamDetails";
import { FavoriteQuestions } from "@/components/FavoriteQuestions";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import TermsNavigationLinks from "@/components/TermsNavigationLinks";
import TermsVersionManager from "@/components/TermsVersionManager";
import {
  CLF_C02_DomainMap,
  SAA_C03_DomainMap,
  CLF_C02_DomainDetails,
  SAA_C03_DomainDetails,
} from "@/lib/types/exam-domains";
import { hasValidConsent } from "@/lib/terms";
import type { TermsConfig } from "@/lib/types/terms";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "@/components/ui/badge";
import {
  getExamSourceInfo,
  getSourceLabel,
  getSourceColor,
  getSourceIcon,
} from "@/lib/utils/examSources";

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
  const [currentView, setCurrentView] = useState<
    "exam" | "progress" | "favorites" | "exam-details"
  >("exam");
  const [selectedExamDetails, setSelectedExamDetails] =
    useState<DetailedExamResult | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedExamData, setSavedExamData] = useState<any>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [checkingTerms, setCheckingTerms] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [currentExamResult, setCurrentExamResult] =
    useState<DetailedExamResult | null>(null);

  // Initialize user progress hook
  const {
    userProgress,
    addExamResult,
    addFavoriteQuestion,
    removeFavoriteQuestion,
    updateFavoriteQuestion,
    isFavoriteQuestion,
    getFavoriteQuestion,
    clearAllProgress,
  } = useUserProgress("user-" + crypto.randomUUID());

  // Keyboard shortcuts configuration
  const handleKeyboardNextQuestion = () => {
    if (
      isActive &&
      !showExplanation &&
      currentQuestionIndex < selectedSimulado.length - 1
    ) {
      handleNextQuestion();
    }
  };

  const handleKeyboardPreviousQuestion = () => {
    if (isActive && !showExplanation && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswers([]);
      setShowExplanation(false);
      setAnswerStatus(null);
      setQuestionStartTime(new Date());
    }
  };

  const handleSelectAnswerByIndex = (index: number) => {
    if (isActive && !showExplanation && currentQuestion?.options?.[index]) {
      const optionId = currentQuestion.options[index].id;
      handleAnswerToggle(optionId);
    }
  };

  const handleSubmitAnswerShortcut = () => {
    if (isActive && !showExplanation && selectedAnswers.length > 0) {
      handleSubmitAnswers();
    }
  };

  const handleSkipQuestion = () => {
    if (isActive && !showExplanation) {
      // Clear current answers and move to next question
      setSelectedAnswers([]);
      handleKeyboardNextQuestion();
    }
  };

  // Initialize keyboard shortcuts hook
  const { showShortcutsModal, setShowShortcutsModal } = useKeyboardShortcuts({
    onNextQuestion: handleKeyboardNextQuestion,
    onPreviousQuestion: handleKeyboardPreviousQuestion,
    onSelectAnswer: handleSelectAnswerByIndex,
    onSubmitAnswer: handleSubmitAnswerShortcut,
    onSkipQuestion: handleSkipQuestion,
    isModalOpen: showResumeDialog,
    isInputFocused: isInputFocused,
    currentQuestionIndex,
    totalQuestions: selectedSimulado.length,
  });

  // Input focus detection for keyboard shortcuts
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.contentEditable === "true" ||
        target.getAttribute("role") === "textbox";
      setIsInputFocused(isInput);
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.contentEditable === "true" ||
        target.getAttribute("role") === "textbox";
      if (isInput) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Terms configuration
  const termsConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: true,
    gracePeriodDays: 7,
    enableVersionHistory: true,
    maxStoredVersions: 5,
  };

  const simulados = {
    "CLF-C02": questions,
    "CLF-C02-01": questionsClfC0201,
    "CLF-C02-02": questionsClfC0202,
    "CLF-C02-GPT": GPTquestions,
    "CLF-C02-FULL-NOGPT": [...questions, ...questionsClfC0201],
    "CLF-C02-CC-01": questionCLFC02CC01,
    "SAA-C03": questionsSaaC03,
  };

  // Check terms acceptance on component mount
  useEffect(() => {
    const checkTermsAcceptance = async () => {
      try {
        setCheckingTerms(true);
        const hasConsent = await hasValidConsent(
          termsConfig.currentVersion,
          termsConfig.gracePeriodDays,
        );
        setTermsAccepted(hasConsent);
      } catch (error) {
        console.error("Error checking terms acceptance:", error);
        // Default to false if there's an error
        setTermsAccepted(false);
      } finally {
        setCheckingTerms(false);
      }
    };

    checkTermsAcceptance();
  }, []);
  // Check for saved exam state on component mount
  useEffect(() => {
    // Only access localStorage if we're in the browser
    if (typeof window === "undefined") return;

    const savedState = localStorage.getItem("examState");
    if (savedState) {
      try {
        const examState = JSON.parse(savedState);
        // Check if the saved state is recent (within 24 hours)
        const savedTime = new Date(examState.timestamp);
        const now = new Date();
        const hoursDiff =
          (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff < 24 && examState.isActive) {
          setSavedExamData(examState);
          setShowResumeDialog(true);
        } else {
          // Clear old saved state
          clearExamState();
        }
      } catch (error) {
        console.error("Error parsing saved exam state:", error);
        clearExamState();
      }
    }
  }, []);

  // Save exam state automatically
  useEffect(() => {
    saveExamState();
  }, [
    isActive,
    selectedExamId,
    selectedSimulado,
    currentQuestionIndex,
    score,
    timeLeft,
    selectedAnswers,
    studyMode,
    selectedDomains,
    selectedCategories,
    allAnswers,
    examStartTime,
  ]);

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
      setQuestionStartTime(new Date());
    } else {
      // Finalize the exam
      if (simulatedExam && examStartTime) {
        const endTime = new Date();
        const timeSpentInSeconds = Math.floor(
          (endTime.getTime() - examStartTime.getTime()) / 1000,
        );

        const updatedExam: SimulatedExam = {
          ...simulatedExam,
          endTime: endTime,
          score: score,
          timeSpent: timeSpentInSeconds,
        };

        // Create detailed exam result
        const questionAttempts: QuestionAttempt[] = selectedSimulado.map(
          (question) => {
            const userAnswer = allAnswers[question.id];
            const correctAnswers = question.options
              .filter((opt) => opt.isCorrect)
              .map((opt) => opt.id);

            return {
              questionId: question.id,
              selectedAnswers: userAnswer?.answers || [],
              correctAnswers,
              isCorrect: userAnswer?.status === "correct",
              isPartial: userAnswer?.status === "partial",
              timestamp: new Date(),
            };
          },
        );

        // Calculate category and domain breakdowns
        const categoryBreakdown: any = {};
        const domainBreakdown: any = {};

        selectedSimulado.forEach((question) => {
          const attempt = questionAttempts.find(
            (a) => a.questionId === question.id,
          );
          if (!attempt) return;

          // Category breakdown
          if (!categoryBreakdown[question.category]) {
            categoryBreakdown[question.category] = {
              correct: 0,
              total: 0,
              percentage: 0,
            };
          }
          categoryBreakdown[question.category].total++;
          if (attempt.isCorrect) {
            categoryBreakdown[question.category].correct++;
          }

          // Domain breakdown
          const domainName = getDomainName(selectedExamId, question.dominio);
          if (!domainBreakdown[domainName]) {
            domainBreakdown[domainName] = {
              correct: 0,
              total: 0,
              percentage: 0,
            };
          }
          domainBreakdown[domainName].total++;
          if (attempt.isCorrect) {
            domainBreakdown[domainName].correct++;
          }
        });

        // Calculate percentages
        Object.keys(categoryBreakdown).forEach((category) => {
          const stats = categoryBreakdown[category];
          stats.percentage = (stats.correct / stats.total) * 100;
        });

        Object.keys(domainBreakdown).forEach((domain) => {
          const stats = domainBreakdown[domain];
          stats.percentage = (stats.correct / stats.total) * 100;
        });

        const detailedResult: DetailedExamResult = {
          exam: updatedExam,
          questionAttempts,
          categoryBreakdown,
          domainBreakdown,
        };

        // Add to user progress
        addExamResult(detailedResult);

        // Store current exam result for immediate access
        setCurrentExamResult(detailedResult);

        setSimulatedExam(updatedExam);
        console.log("Exam Completed:", updatedExam); // Log or save the exam data
      }
      setShowScore(true);
      setIsActive(false);
      setEndMessage("Parabéns! Você finalizou a prova.");
      // Clear saved state when exam is completed
      clearExamState();
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

  const startExam = async () => {
    if (!selectedExamId) {
      alert("Por favor, selecione um simulado antes de começar.");
      return;
    }

    // Check terms acceptance before starting exam
    try {
      const hasConsent = await hasValidConsent(
        termsConfig.currentVersion,
        termsConfig.gracePeriodDays,
      );
      if (!hasConsent) {
        alert(
          "Você deve aceitar os Termos de Serviço antes de iniciar o exame.",
        );
        return;
      }
    } catch (error) {
      console.error("Error checking terms acceptance:", error);
      alert("Erro ao verificar aceitação dos termos. Tente novamente.");
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

    const examStart = new Date();
    const newExam: SimulatedExam = {
      id: selectedExamId,
      userId: "user-" + crypto.randomUUID(),
      questions: filteredQuestions.map((q) => q.id),
      answers: {},
      startTime: examStart,
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
    setExamStartTime(examStart);
    setAllAnswers({});
    setQuestionStartTime(new Date());
    setCurrentExamResult(null);
    // Clear any previous saved state when starting a new exam
    clearExamState();
  };

  const handleToggleFavorite = (questionId: string) => {
    if (isFavoriteQuestion(questionId)) {
      removeFavoriteQuestion(questionId);
    } else {
      addFavoriteQuestion(questionId, selectedExamId);
    }
  };

  const handleViewExamDetails = (examResult: DetailedExamResult) => {
    setSelectedExamDetails(examResult);
    setCurrentView("exam-details");
  };

  const handleViewQuestion = (question: Question) => {
    // This could open a modal or navigate to a detailed question view
    console.log("View question:", question);
  };

  const getAllQuestions = (): Question[] => {
    return Object.values(simulados).flat();
  };

  const saveExamState = () => {
    if (typeof window === "undefined" || !isActive) return;

    const examState = {
      isActive,
      selectedExamId,
      selectedSimulado,
      currentQuestionIndex,
      score,
      timeLeft,
      selectedAnswers,
      studyMode,
      selectedDomains,
      selectedCategories,
      allAnswers,
      examStartTime: examStartTime?.toISOString(),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("examState", JSON.stringify(examState));
  };

  const clearExamState = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("examState");
  };

  const resumeSavedExam = () => {
    if (!savedExamData) return;

    setIsActive(savedExamData.isActive);
    setSelectedExamId(savedExamData.selectedExamId);
    setSelectedSimulado(savedExamData.selectedSimulado);
    setCurrentQuestionIndex(savedExamData.currentQuestionIndex);
    setScore(savedExamData.score);
    setTimeLeft(savedExamData.timeLeft);
    setSelectedAnswers(savedExamData.selectedAnswers);
    setStudyMode(savedExamData.studyMode);
    setSelectedDomains(savedExamData.selectedDomains || []);
    setSelectedCategories(savedExamData.selectedCategories || []);
    setAllAnswers(savedExamData.allAnswers || {});
    setExamStartTime(
      savedExamData.examStartTime
        ? new Date(savedExamData.examStartTime)
        : null,
    );

    setShowResumeDialog(false);
    setSavedExamData(null);
  };

  const discardSavedExam = () => {
    setShowResumeDialog(false);
    setSavedExamData(null);
    clearExamState();
  };

  const resetExam = () => {
    setIsActive(false);
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(90 * 60);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setAnswerStatus(null);
    setEndMessage(null);
    setAllAnswers({});
    setExamStartTime(null);
    setCurrentView("exam");
    setShowResumeDialog(false);
    setSavedExamData(null);
    setCurrentExamResult(null);
    clearExamState();
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
      case "CLF-C02-CC-01":
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

  // Terms acceptance handlers
  const handleTermsAcceptanceRequired = (version: string) => {
    console.log("Terms acceptance required for version:", version);
    setTermsAccepted(false);
  };

  const handleTermsAcceptanceComplete = async () => {
    try {
      // Add a small delay to ensure the consent is properly stored
      await new Promise((resolve) => setTimeout(resolve, 100));

      const hasConsent = await hasValidConsent(
        termsConfig.currentVersion,
        termsConfig.gracePeriodDays,
      );
      setTermsAccepted(hasConsent);
      console.log("Terms acceptance completed, consent status:", hasConsent);

      // If consent is still not valid, force a recheck
      if (!hasConsent) {
        console.warn(
          "Terms acceptance completed but consent still invalid, rechecking...",
        );
        setTimeout(async () => {
          const recheckConsent = await hasValidConsent(
            termsConfig.currentVersion,
            termsConfig.gracePeriodDays,
          );
          setTermsAccepted(recheckConsent);
        }, 500);
      }
    } catch (error) {
      console.error("Error updating terms acceptance status:", error);
      // Don't block the user if there's an error checking consent
      setTermsAccepted(true);
    }
  };

  const handleTermsError = (error: string) => {
    console.error("Terms error:", error);
    // If terms are required but user declined, redirect to home page
    if (error.includes("Terms acceptance is required")) {
      console.log("User declined terms, redirecting to home page");
      // Show a brief message before redirecting
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
    // For other errors, just log them
  };

  return (
    <TermsVersionManager
      config={termsConfig}
      onAcceptanceRequired={handleTermsAcceptanceRequired}
      onAcceptanceComplete={handleTermsAcceptanceComplete}
      onError={handleTermsError}
    >
      <div className="min-h-screen p-4">
        {/* Resume Exam Dialog */}
        {showResumeDialog && savedExamData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Exame em Andamento
                </CardTitle>
                <CardDescription>
                  Encontramos um exame que você estava fazendo. Deseja continuar
                  de onde parou?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Exame:</strong> {savedExamData.selectedExamId}
                  </p>
                  <p>
                    <strong>Modo:</strong>{" "}
                    {savedExamData.studyMode === "practice"
                      ? "Prática"
                      : savedExamData.studyMode === "exam"
                        ? "Exame Simulado"
                        : "Estudo Focado"}
                  </p>
                  <p>
                    <strong>Progresso:</strong>{" "}
                    {savedExamData.currentQuestionIndex + 1} de{" "}
                    {savedExamData.selectedSimulado?.length || 0} questões
                  </p>
                  <p>
                    <strong>Pontuação atual:</strong> {savedExamData.score}{" "}
                    pontos
                  </p>
                  {savedExamData.studyMode === "exam" && (
                    <p>
                      <strong>Tempo restante:</strong>{" "}
                      {Math.floor(savedExamData.timeLeft / 60)}m{" "}
                      {savedExamData.timeLeft % 60}s
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button onClick={resumeSavedExam} className="flex-1">
                    Continuar Exame
                  </Button>
                  <Button
                    onClick={discardSavedExam}
                    variant="outline"
                    className="flex-1"
                  >
                    Começar Novo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-4">
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
                <div className="flex items-center gap-2">
                  {isActive && studyMode === "exam" && (
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                      <Timer className="w-4 h-4" />
                      <span className="font-mono font-medium">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  )}
                  {!isActive && (
                    <div className="flex gap-2">
                      <Button
                        variant={currentView === "exam" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentView("exam")}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Exame
                      </Button>
                      <Button
                        variant={
                          currentView === "progress" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentView("progress")}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Progresso
                      </Button>
                      <Button
                        variant={
                          currentView === "favorites" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentView("favorites")}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Favoritas ({userProgress.favoriteQuestions.length})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowShortcutsModal(true)}
                        title="Atalhos do Teclado (Pressione ? para abrir)"
                      >
                        <Keyboard className="w-4 h-4 mr-2" />
                        Atalhos
                      </Button>
                    </div>
                  )}
                </div>
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
                      {selectedExamId && (
                        <Badge
                          variant="outline"
                          className={`text-sm ${getSourceColor(getExamSourceInfo(selectedExamId).primarySource)}`}
                        >
                          {getSourceIcon(
                            getExamSourceInfo(selectedExamId).primarySource,
                          )}{" "}
                          {getSourceLabel(
                            getExamSourceInfo(selectedExamId).primarySource,
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {currentView === "progress" && (
                <ProgressReport
                  userProgress={userProgress}
                  onViewExamDetails={handleViewExamDetails}
                />
              )}

              {currentView === "favorites" && (
                <FavoriteQuestions
                  favoriteQuestions={userProgress.favoriteQuestions}
                  questions={getAllQuestions()}
                  onRemoveFavorite={removeFavoriteQuestion}
                  onUpdateFavorite={updateFavoriteQuestion}
                  onViewQuestion={handleViewQuestion}
                />
              )}

              {currentView === "exam-details" && selectedExamDetails && (
                <ExamDetails
                  examResult={selectedExamDetails}
                  questions={getAllQuestions()}
                  onBack={() => setCurrentView("progress")}
                  onToggleFavorite={handleToggleFavorite}
                  isFavoriteQuestion={isFavoriteQuestion}
                />
              )}

              {currentView === "exam" && !isActive && !showScore && (
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
                        onValueChange={(value: StudyMode) =>
                          setStudyMode(value)
                        }
                        value={studyMode}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o modo de estudo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="practice">
                            Modo de Prática - Feedback imediato após cada
                            questão
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
                          <label className="text-sm font-medium">
                            Domínios
                          </label>
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
                              <SelectItem value="DOMAIN_3">
                                Tecnologia
                              </SelectItem>
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
                                      selectedDomains.filter(
                                        (d) => d !== domain,
                                      ),
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
                              if (
                                value &&
                                !selectedCategories.includes(value)
                              ) {
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
                              <SelectItem value="security">
                                Segurança
                              </SelectItem>
                              <SelectItem value="technology">
                                Tecnologia
                              </SelectItem>
                              <SelectItem value="billing">
                                Faturamento
                              </SelectItem>
                              <SelectItem value="compute">
                                Computação
                              </SelectItem>
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
                          {Object.keys(simulados).map((examId) => {
                            const sourceInfo = getExamSourceInfo(examId);
                            return (
                              <SelectItem key={examId} value={examId}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {sourceInfo.name} (
                                      {sourceInfo.questionCount} questões)
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {sourceInfo.description}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 ml-2">
                                    <span className="text-xs">
                                      {getSourceIcon(sourceInfo.primarySource)}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs px-1 py-0 ${getSourceColor(sourceInfo.primarySource)}`}
                                    >
                                      {getSourceLabel(sourceInfo.primarySource)}
                                    </Badge>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {!checkingTerms && !termsAccepted && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Termos de Serviço Requeridos
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              Você deve aceitar nossos Termos de Serviço antes
                              de iniciar o exame.
                            </p>
                            <div className="mt-3 flex flex-col gap-2">
                              <TermsNavigationLinks
                                variant="link"
                                className="text-sm text-yellow-800 hover:text-yellow-900"
                              />
                              <button
                                onClick={async () => {
                                  setCheckingTerms(true);
                                  try {
                                    const hasConsent = await hasValidConsent(
                                      termsConfig.currentVersion,
                                      termsConfig.gracePeriodDays,
                                    );
                                    setTermsAccepted(hasConsent);
                                  } catch (error) {
                                    console.error(
                                      "Error rechecking terms:",
                                      error,
                                    );
                                  } finally {
                                    setCheckingTerms(false);
                                  }
                                }}
                                className="text-xs text-yellow-800 hover:text-yellow-900 underline text-left"
                                disabled={checkingTerms}
                              >
                                {checkingTerms
                                  ? "Verificando..."
                                  : "Verificar novamente"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={startExam}
                      disabled={
                        !selectedExamId || checkingTerms || !termsAccepted
                      }
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      {checkingTerms && "Verificando Termos..."}
                      {!checkingTerms &&
                        !termsAccepted &&
                        "Aceite os Termos para Continuar"}
                      {!checkingTerms &&
                        termsAccepted &&
                        studyMode === "practice" &&
                        "Iniciar Modo de Prática"}
                      {!checkingTerms &&
                        termsAccepted &&
                        studyMode === "exam" &&
                        "Iniciar Exame Simulado"}
                      {!checkingTerms &&
                        termsAccepted &&
                        studyMode === "domain_focus" &&
                        "Iniciar Estudo Focado"}
                    </Button>
                  </div>
                </div>
              )}

              {currentView === "exam" &&
                isActive &&
                !showScore &&
                currentQuestion && (
                  <div className="space-y-6">
                    {/* background color: #bg-background text-foreground */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
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
                          {/* {selectedExamId && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${getSourceColor(getExamSourceInfo(selectedExamId).primarySource)}`}
                            >
                              {getSourceIcon(
                                getExamSourceInfo(selectedExamId).primarySource,
                              )}{" "}
                              {getSourceLabel(
                                getExamSourceInfo(selectedExamId).primarySource,
                              )}
                            </Badge>
                          )} */}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleToggleFavorite(currentQuestion.id)
                            }
                            className={
                              isFavoriteQuestion(currentQuestion.id)
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }
                            title="Adicionar aos Favoritos"
                          >
                            <Star
                              className={`h-4 w-4 ${isFavoriteQuestion(currentQuestion.id) ? "fill-current" : ""}`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowShortcutsModal(true)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Atalhos do Teclado (Pressione ? para abrir)"
                          >
                            <Keyboard className="h-4 w-4" />
                          </Button>
                          <TermsNavigationLinks variant="button" size="sm" />
                        </div>
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
                          <h4 className="font-medium text-gray-700">
                            References:
                          </h4>
                          <ul className="space-y-1">
                            {currentQuestion.references.map(
                              (reference, index) => (
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
                              ),
                            )}
                          </ul>
                        </div>

                        <Button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto"
                          // variant={
                          //   answerStatus === "correct" ? "default" : "secondary"
                          // }
                        >
                          {currentQuestionIndex ===
                          selectedSimulado.length - 1 ? (
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

              {currentView === "exam" && showScore && (
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
                    {endMessage && (
                      <p className="text-gray-600">{endMessage}</p>
                    )}
                  </div>

                  <div className="max-w-xs mx-auto p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600">
                      {Math.round((score / selectedSimulado.length) * 100)}%
                    </div>
                    <p className="text-gray-600 mt-2">
                      {score} corretas de {selectedSimulado.length} questões
                    </p>
                    {simulatedExam?.timeSpent && (
                      <p className="text-sm text-gray-500 mt-1">
                        Tempo gasto: {Math.floor(simulatedExam.timeSpent / 60)}m{" "}
                        {simulatedExam.timeSpent % 60}s
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

                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                      onClick={resetExam}
                      variant="outline"
                      className="gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Escolher Outro Exame
                    </Button>
                    <Button onClick={startExam} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Tentar Novamente
                    </Button>
                    {currentExamResult && (
                      <Button
                        onClick={() => {
                          handleViewExamDetails(currentExamResult);
                        }}
                        variant="secondary"
                        className="gap-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Ver Detalhes do Exame
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contextual Terms Links */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Ao usar este simulador, você concorda com nossos
              </p>
              <TermsNavigationLinks variant="inline" className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </TermsVersionManager>
  );
};

export default ExamSimulator;
