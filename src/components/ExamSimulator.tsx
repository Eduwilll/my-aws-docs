import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Timer,
  Star,
  BarChart3,
  BookOpen,
  Keyboard,
  PanelLeftClose,
  PanelLeftOpen,
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
import { useExamTimer } from "@/hooks/useExamTimer";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import { QuestionNavigationPanel } from "@/components/QuestionNavigationPanel";
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
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getExamSourceInfo,
  getSourceLabel,
  getSourceColor,
} from "@/lib/utils/examSources";
import { loadQuestionBank } from "@/lib/utils/questionLoader";

// Extracted sub-components
import { ExamSelectionScreen } from "@/components/exam/ExamSelectionScreen";
import { ActiveExamView } from "@/components/exam/ActiveExamView";
import { ExamScoreScreen } from "@/components/exam/ExamScoreScreen";
import { ExamSidebar } from "@/components/exam/ExamSidebar";

// Lazy-loaded secondary views
const ProgressReport = React.lazy(() =>
  import("@/components/ProgressReport").then((m) => ({
    default: m.ProgressReport,
  })),
);
const ExamDetails = React.lazy(() =>
  import("@/components/ExamDetails").then((m) => ({ default: m.ExamDetails })),
);
const FavoriteQuestions = React.lazy(() =>
  import("@/components/FavoriteQuestions").then((m) => ({
    default: m.FavoriteQuestions,
  })),
);

// ─── Static config ────────────────────────────────────────────────────────────

const termsConfig: TermsConfig = {
  currentVersion: "1.0.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 7,
  enableVersionHistory: true,
  maxStoredVersions: 5,
};

const certificationBanks: Record<string, string[]> = {
  "CLF-C02": [
    "CLF-C02-FULL",
    "CLF-C02-01",
    "CLF-C02-02",
    "CLF-C02-CC-01",
    "CLF-C02-GPT",
  ],
  "SAA-C03": ["SAA-C03-FULL"],
  "DVA-C02": [],
};

const certifications = [
  {
    id: "CLF-C02",
    title: "AWS Certified Cloud Practitioner",
    img: "/images/badges/AWS-Cloud-Practitioner_badge.png",
  },
  {
    id: "SAA-C03",
    title: "AWS Certified Solutions Architect – Associate",
    img: "/images/badges/AWS-Solutions-Architect-Associate_badge.png",
  },
  {
    id: "DVA-C02",
    title: "AWS Certified Developer – Associate",
    img: "/images/badges/AWS-Certified-Developer-Associate_badge.png",
  },
];

// ─── Domain helpers ───────────────────────────────────────────────────────────

function getDomainMap(examId: string) {
  return examId.startsWith("SAA-C03") ? SAA_C03_DomainMap : CLF_C02_DomainMap;
}

function getDomainName(examId: string, domain: string) {
  const map = getDomainMap(examId);
  return map[domain as keyof typeof map] || "Unknown Domain";
}

function getDomainDetails(examId: string) {
  return examId.startsWith("SAA-C03")
    ? SAA_C03_DomainDetails
    : CLF_C02_DomainDetails;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ExamSimulator = () => {
  // ── UI state
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState<
    "exam" | "progress" | "favorites" | "exam-details"
  >("exam");
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedExamData, setSavedExamData] = useState<any>(null);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  // ── Exam selection state
  const [selectedCertification, setSelectedCertification] =
    useState<string>("");
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [studyMode, setStudyMode] = useState<StudyMode>("practice");
  const [selectedDomains, setSelectedDomains] = useState<ExamDomainKey[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ExamCategory[]>(
    [],
  );

  // ── Exam active state
  const [isActive, setIsActive] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [selectedSimulado, setSelectedSimulado] = useState<Question[]>([]);
  const [cachedQuestions, setCachedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "incorrect" | "partial" | null
  >(null);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const [allAnswers, setAllAnswers] = useState<{
    [qId: string]: {
      answers: string[];
      status: "correct" | "incorrect" | "partial" | null;
    };
  }>({});
  const [questionStatuses, setQuestionStatuses] = useState<{
    [idx: number]: {
      answered: boolean;
      skipped: boolean;
      correct?: boolean | null;
    };
  }>({});
  const [simulatedExam, setSimulatedExam] = useState<SimulatedExam | null>(
    null,
  );
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [currentExamResult, setCurrentExamResult] =
    useState<DetailedExamResult | null>(null);
  const [selectedExamDetails, setSelectedExamDetails] =
    useState<DetailedExamResult | null>(null);

  // ── Terms state
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [checkingTerms, setCheckingTerms] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const activeExamRef = useRef<HTMLDivElement>(null);

  // Scroll to active exam when it starts
  useEffect(() => {
    if (isActive && activeExamRef.current) {
      activeExamRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isActive]);

  // Scroll to top of question area when question index changes
  useEffect(() => {
    if (isActive && activeExamRef.current) {
      activeExamRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentQuestionIndex]);

  // ── Stable userId
  const [userId] = useState(() =>
    typeof window !== "undefined" && window.crypto
      ? "user-" + crypto.randomUUID()
      : "user-fallback",
  );

  // ── Derived question data
  const currentQuestion =
    selectedSimulado[currentQuestionIndex] || selectedSimulado[0];
  const currentOptions = currentQuestion?.options || [];
  const correctOptions = currentOptions.filter((o) => o.isCorrect);
  const incorrectOptions = currentOptions.filter((o) => !o.isCorrect);
  const progress = ((currentQuestionIndex + 1) / selectedSimulado.length) * 100;

  // ── Hooks
  const {
    userProgress,
    addExamResult,
    addFavoriteQuestion,
    removeFavoriteQuestion,
    updateFavoriteQuestion,
    isFavoriteQuestion,
    getFavoriteQuestion,
    clearAllProgress,
  } = useUserProgress(userId);

  const { timeLeft, setTimeLeft, formatTime } = useExamTimer({
    isActive,
    studyMode,
    initialTime: studyMode === "exam" ? 90 * 60 : 999999,
    onTimeExpired: () => {
      setShowScore(true);
      setIsActive(false);
      setEndMessage(
        "O tempo acabou! Sua prova foi finalizada automaticamente.",
      );
    },
  });

  // ── Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined")
      setIsSidebarOpen(window.innerWidth >= 1366);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      setIsInputFocused(
        ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) ||
          t.contentEditable === "true" ||
          t.getAttribute("role") === "textbox",
      );
    };
    const onOut = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) ||
        t.contentEditable === "true" ||
        t.getAttribute("role") === "textbox"
      )
        setIsInputFocused(false);
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCheckingTerms(true);
        const ok = await hasValidConsent(
          termsConfig.currentVersion,
          termsConfig.gracePeriodDays,
        );
        setTermsAccepted(ok);
      } catch {
        setTermsAccepted(false);
      } finally {
        setCheckingTerms(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("examState");
    if (!saved) return;
    try {
      const state = JSON.parse(saved);
      const hours =
        (Date.now() - new Date(state.timestamp).getTime()) / 3600000;
      if (hours < 24 && state.isActive) {
        setSavedExamData(state);
        setShowResumeDialog(true);
      } else clearExamState();
    } catch {
      clearExamState();
    }
  }, []);

  // Background loading for favorites and recent exams
  useEffect(() => {
    if (!isMounted) return;

    const loadMissingData = async () => {
      const bankIdsToLoad = new Set<string>();

      // Check favorites
      userProgress.favoriteQuestions.forEach((fav) => {
        if (!cachedQuestions.find((q) => q.id === fav.questionId)) {
          bankIdsToLoad.add(fav.examId);
        }
      });

      // Check recent exams (to show details)
      userProgress.recentExams.forEach((result) => {
        if (
          result.questionAttempts.some(
            (att) => !cachedQuestions.find((q) => q.id === att.questionId),
          )
        ) {
          bankIdsToLoad.add(result.exam.id);
        }
      });

      if (bankIdsToLoad.size > 0) {
        setIsLoadingFavorites(true);
        try {
          const loadedQuestions = (
            await Promise.all(
              Array.from(bankIdsToLoad).map((id) => loadQuestionBank(id)),
            )
          ).flat();

          setCachedQuestions((prev) => {
            const existingIds = new Set(prev.map((q) => q.id));
            const newOnes = loadedQuestions.filter(
              (q) => !existingIds.has(q.id),
            );
            return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
          });
        } catch (e) {
          console.error("Error background loading question banks:", e);
        } finally {
          setIsLoadingFavorites(false);
        }
      }
    };

    loadMissingData();
  }, [isMounted, userProgress.favoriteQuestions, userProgress.recentExams]);

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
    questionStatuses,
  ]);

  // ── Helpers
  const toggleFullscreen = () => {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen().catch(console.error);
    else document.exitFullscreen?.();
  };

  const saveExamState = () => {
    if (typeof window === "undefined" || !isActive) return;
    localStorage.setItem(
      "examState",
      JSON.stringify({
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
        questionStatuses,
        examStartTime: examStartTime?.toISOString(),
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const clearExamState = () => {
    if (typeof window !== "undefined") localStorage.removeItem("examState");
  };

  const filterQuestionsByStudyMode = (questions: Question[]): Question[] => {
    if (studyMode !== "domain_focus") return questions;
    return questions.filter((q) => {
      const domainOk =
        selectedDomains.length === 0 || selectedDomains.includes(q.dominio);
      const categoryOk =
        selectedCategories.length === 0 ||
        selectedCategories.includes(q.category);
      return domainOk && categoryOk;
    });
  };

  // ── Keyboard navigation
  const handleKeyboardNextQuestion = () => {
    if (
      isActive &&
      !showExplanation &&
      currentQuestionIndex < selectedSimulado.length - 1
    )
      handleNextQuestion();
  };
  const handleKeyboardPreviousQuestion = () => {
    if (isActive && !showExplanation && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      setSelectedAnswers([]);
      setShowExplanation(false);
      setAnswerStatus(null);
      setQuestionStartTime(new Date());
    }
  };
  const handleSelectAnswerByIndex = (index: number) => {
    if (isActive && !showExplanation && currentQuestion?.options?.[index])
      handleAnswerToggle(currentQuestion.options[index].id);
  };
  const handleSubmitAnswerShortcut = () => {
    if (isActive && !showExplanation && selectedAnswers.length > 0)
      handleSubmitAnswers();
  };
  const handleSkipQuestion = () => {
    if (!isActive || showExplanation) return;
    setQuestionStatuses((p) => ({
      ...p,
      [currentQuestionIndex]: { answered: false, skipped: true, correct: null },
    }));
    setSelectedAnswers([]);
    handleKeyboardNextQuestion();
  };
  const handleQuestionSelect = (idx: number) => {
    if (!isActive || showExplanation) return;
    setCurrentQuestionIndex(idx);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setAnswerStatus(null);
    setQuestionStartTime(new Date());
  };

  const { showShortcutsModal, setShowShortcutsModal } = useKeyboardShortcuts({
    onNextQuestion: handleKeyboardNextQuestion,
    onPreviousQuestion: handleKeyboardPreviousQuestion,
    onSelectAnswer: handleSelectAnswerByIndex,
    onSubmitAnswer: handleSubmitAnswerShortcut,
    onSkipQuestion: handleSkipQuestion,
    isModalOpen: showResumeDialog,
    isInputFocused,
    currentQuestionIndex,
    totalQuestions: selectedSimulado.length,
  });

  // ── Answer handling
  const handleAnswerToggle = (answerId: string) => {
    setSelectedAnswers((prev) =>
      prev.includes(answerId)
        ? prev.filter((id) => id !== answerId)
        : [...prev, answerId],
    );
  };

  const handleSubmitAnswers = () => {
    const correctIds = currentOptions
      .filter((o) => o.isCorrect)
      .map((o) => o.id);
    const isFullyCorrect =
      selectedAnswers.length === correctIds.length &&
      selectedAnswers.every((id) => correctIds.includes(id));
    const hasPartial =
      selectedAnswers.some((id) => correctIds.includes(id)) && !isFullyCorrect;
    let status: "correct" | "incorrect" | "partial" = "incorrect";
    if (isFullyCorrect) {
      setScore((s) => s + 1);
      status = "correct";
    } else if (hasPartial) {
      setScore((s) => s + 0.5);
      status = "partial";
    }

    setAllAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { answers: selectedAnswers, status },
    }));
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        answered: true,
        skipped: false,
        correct: studyMode === "practice" ? isFullyCorrect : null,
      },
    }));

    if (simulatedExam)
      setSimulatedExam({
        ...simulatedExam,
        answers: {
          ...simulatedExam.answers,
          [currentQuestion.id]: selectedAnswers.join(","),
        },
      });

    if (studyMode === "practice") {
      setAnswerStatus(status);
      setShowExplanation(true);
    } else handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerStatus(null);
    setSelectedAnswers([]);
    if (currentQuestionIndex + 1 < selectedSimulado.length) {
      setCurrentQuestionIndex((i) => i + 1);
      setQuestionStartTime(new Date());
    } else {
      finalizeExam();
    }
  };

  const finalizeExam = () => {
    if (!simulatedExam || !examStartTime) {
      setShowScore(true);
      setIsActive(false);
      setEndMessage("Parabéns! Você finalizou a prova.");
      clearExamState();
      return;
    }
    const endTime = new Date();
    const timeSpent = Math.floor(
      (endTime.getTime() - examStartTime.getTime()) / 1000,
    );
    const updatedExam: SimulatedExam = {
      ...simulatedExam,
      endTime,
      score,
      timeSpent,
    };

    const attempts: QuestionAttempt[] = selectedSimulado.map((q) => {
      const ua = allAnswers[q.id];
      const correctAnswers = q.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id);
      return {
        questionId: q.id,
        selectedAnswers: ua?.answers || [],
        correctAnswers,
        isCorrect: ua?.status === "correct",
        isPartial: ua?.status === "partial",
        timestamp: new Date(),
      };
    });

    const categoryBreakdown: any = {};
    const domainBreakdown: any = {};
    selectedSimulado.forEach((q) => {
      const att = attempts.find((a) => a.questionId === q.id);
      if (!att) return;
      categoryBreakdown[q.category] = categoryBreakdown[q.category] || {
        correct: 0,
        total: 0,
        percentage: 0,
      };
      categoryBreakdown[q.category].total++;
      if (att.isCorrect) categoryBreakdown[q.category].correct++;
      const dn = getDomainName(selectedExamId, q.dominio);
      domainBreakdown[dn] = domainBreakdown[dn] || {
        correct: 0,
        total: 0,
        percentage: 0,
      };
      domainBreakdown[dn].total++;
      if (att.isCorrect) domainBreakdown[dn].correct++;
    });
    Object.values(categoryBreakdown).forEach(
      (s: any) => (s.percentage = (s.correct / s.total) * 100),
    );
    Object.values(domainBreakdown).forEach(
      (s: any) => (s.percentage = (s.correct / s.total) * 100),
    );

    const result: DetailedExamResult = {
      exam: updatedExam,
      questionAttempts: attempts,
      categoryBreakdown,
      domainBreakdown,
    };
    addExamResult(result);
    setCurrentExamResult(result);
    setSimulatedExam(updatedExam);
    setShowScore(true);
    setIsActive(false);
    setEndMessage("Parabéns! Você finalizou a prova.");
    clearExamState();
  };

  const getButtonVariant = (optionId: string): any => {
    const isSelected = selectedAnswers.includes(optionId);
    const isCorrect = currentOptions.find((o) => o.id === optionId)?.isCorrect;
    if (!showExplanation) return isSelected ? "default" : "outline";
    if (isCorrect) return "success";
    if (isSelected && !isCorrect) return "destructive";
    return "outline";
  };

  // ── Start / Reset / Resume
  const startExam = async () => {
    if (!selectedCertification) {
      alert("Por favor, selecione uma certificação.");
      return;
    }
    const bankId =
      studyMode === "domain_focus"
        ? `${selectedCertification}-FULL`
        : selectedExamId;
    if (!bankId) {
      alert("Por favor, selecione um banco de questões.");
      return;
    }

    try {
      const ok = await hasValidConsent(
        termsConfig.currentVersion,
        termsConfig.gracePeriodDays,
      );
      if (!ok) {
        alert(
          "Você deve aceitar os Termos de Serviço antes de iniciar o exame.",
        );
        return;
      }
    } catch {
      alert("Erro ao verificar aceitação dos termos. Tente novamente.");
      return;
    }

    setIsLoadingQuestions(true);
    let rawQuestions: Question[];
    try {
      rawQuestions = await loadQuestionBank(bankId);
    } catch (e) {
      alert("Erro ao carregar questões. Tente novamente.");
      setIsLoadingQuestions(false);
      return;
    } finally {
      setIsLoadingQuestions(false);
    }

    const filtered = filterQuestionsByStudyMode(rawQuestions);
    if (filtered.length === 0) {
      alert("Nenhuma questão encontrada com os filtros selecionados.");
      return;
    }

    const examStart = new Date();
    setSelectedSimulado(filtered);
    // Cache questions so they remain available after exam ends (for ExamDetails, FavoriteQuestions, etc.)
    setCachedQuestions((prev) => {
      const existingIds = new Set(prev.map((q) => q.id));
      const newOnes = filtered.filter((q) => !existingIds.has(q.id));
      return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
    });
    setSimulatedExam({
      id: bankId,
      userId: "user-" + crypto.randomUUID(),
      questions: filtered.map((q) => q.id),
      answers: {},
      startTime: examStart,
      studySettings: {
        mode: studyMode,
        selectedDomains,
        selectedCategories,
        timeLimit: studyMode === "exam" ? 90 : undefined,
        showImmediateFeedback: studyMode === "practice",
      },
    });
    setIsActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(studyMode === "exam" ? 90 * 60 : 999999);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setEndMessage(null);
    setExamStartTime(examStart);
    setAllAnswers({});
    setQuestionStartTime(new Date());
    setCurrentExamResult(null);
    setQuestionStatuses({});
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
    setQuestionStatuses({});
    clearExamState();
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
    setQuestionStatuses(savedExamData.questionStatuses || {});
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

  // ── Terms handlers
  const handleTermsAcceptanceRequired = React.useCallback(
    (v: string) => setTermsAccepted(false),
    [],
  );
  const handleTermsAcceptanceComplete = React.useCallback(async () => {
    try {
      await new Promise((r) => setTimeout(r, 100));
      const ok = await hasValidConsent(
        termsConfig.currentVersion,
        termsConfig.gracePeriodDays,
      );
      setTermsAccepted(ok);
      if (!ok)
        setTimeout(
          async () =>
            setTermsAccepted(
              await hasValidConsent(
                termsConfig.currentVersion,
                termsConfig.gracePeriodDays,
              ),
            ),
          500,
        );
    } catch {
      setTermsAccepted(true);
    }
  }, []);
  const handleTermsError = React.useCallback((err: string) => {
    if (err.includes("Terms acceptance is required"))
      setTimeout(() => (window.location.href = "/"), 500);
  }, []);

  // ── Favorites & secondary views
  const handleToggleFavorite = (questionId: string) =>
    isFavoriteQuestion(questionId)
      ? removeFavoriteQuestion(questionId)
      : addFavoriteQuestion(questionId, selectedExamId);
  const handleViewExamDetails = (r: DetailedExamResult) => {
    setSelectedExamDetails(r);
    setCurrentView("exam-details");
  };
  const handleViewQuestion = (q: Question) => console.log("View question:", q);
  // Returns all questions seen so far (loaded dynamically). Falls back to selectedSimulado.
  const getAllQuestions = (): Question[] =>
    cachedQuestions.length > 0 ? cachedQuestions : selectedSimulado;

  const handleRecheckTerms = async () => {
    setCheckingTerms(true);
    try {
      setTermsAccepted(
        await hasValidConsent(
          termsConfig.currentVersion,
          termsConfig.gracePeriodDays,
        ),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingTerms(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-full mx-auto px-4 lg:px-0 transition-all duration-300">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-80 min-w-[20rem] flex-shrink-0">
          <div className="glass-card border border-border/10 shadow-2xl rounded-[2rem] p-6 h-[400px] animate-pulse flex flex-col justify-between">
            <div className="space-y-6">
              <div className="h-8 bg-muted/60 rounded-xl w-3/4"></div>
              <div className="space-y-3">
                <div className="h-12 bg-muted/40 rounded-xl w-full"></div>
                <div className="h-12 bg-muted/40 rounded-xl w-full"></div>
                <div className="h-12 bg-muted/40 rounded-xl w-full"></div>
              </div>
            </div>
            <div className="h-10 bg-muted/60 rounded-xl w-1/2"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 w-full">
          <Card className="glass-card border border-border/10 shadow-2xl rounded-[2rem] overflow-hidden min-h-[500px] flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-6 text-center max-w-sm">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-500 rounded-full animate-spin [animation-duration:1.5s]"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gradient">
                  Carregando Simulador
                </h3>
                <p className="text-sm text-muted-foreground animate-pulse">
                  Preparando o ambiente de estudos...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <TermsVersionManager
        config={termsConfig}
        onAcceptanceRequired={handleTermsAcceptanceRequired}
        onAcceptanceComplete={handleTermsAcceptanceComplete}
        onError={handleTermsError}
      >
        <div className="min-h-screen bg-transparent text-foreground transition-colors duration-500">
          <div className="p-4 md:p-6 lg:p-8 max-w-[1700px] mx-auto transition-all duration-500">
            {/* 1. SELECTION / PROGRESS / FAVORITES VIEW (Not active exam) */}
            {!isActive && (
              <div className="w-full space-y-8 animate-in fade-in duration-700">
                {/* Header Title  */}
                {/* <div className="mb-10 text-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight">
                    Simulador de Exame
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Prepare-se para sua certificação AWS com perguntas baseadas
                    em cenários reais. Boa sorte!
                  </p>
                </div> */}
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-full mx-auto px-4 lg:px-0 transition-all duration-300">
                  {/* Sidebar - Aligned with the top of the Card */}
                  <div
                    className={`hidden lg:block transition-all duration-300 ${
                      isSidebarCollapsed
                        ? "w-20 min-w-[5rem]"
                        : "w-80 min-w-[20rem]"
                    } flex-shrink-0`}
                  >
                    <ExamSidebar
                      currentView={
                        currentView === "exam-details"
                          ? "progress"
                          : currentView
                      }
                      onViewChange={(v) => setCurrentView(v)}
                      isCollapsed={isSidebarCollapsed}
                      onToggleCollapse={() =>
                        setIsSidebarCollapsed(!isSidebarCollapsed)
                      }
                      favoriteCount={userProgress.favoriteQuestions.length}
                    />
                  </div>

                  {/* Main Content Area for Selection/Progress */}
                  <div className="flex-1 w-full space-y-6">
                    <Card className="glass-card border-none shadow-2xl rounded-[2rem] overflow-hidden">
                      {/* <CardHeader className="space-y-4 pb-2 pt-8 px-8"> */}
                      {/* <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="space-y-1">
                            <CardTitle className="text-3xl md:text-4xl font-extrabold text-gradient tracking-tight">
                              AWS Cloud Practitioner
                            </CardTitle>
                            <CardDescription className="text-base">
                              Exame Simulado para o certificado AWS Cloud
                              Practitioner
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowShortcutsModal(true)}
                              className="rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                              <Keyboard className="w-4 h-4 mr-2" /> Atalhos
                            </Button>
                          </div>
                        </div> */}
                      {/* </CardHeader> */}

                      <CardContent className="p-6 md:p-8">
                        <Suspense
                          fallback={
                            <div className="text-center py-12 text-muted-foreground">
                              Carregando conteúdo...
                            </div>
                          }
                        >
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
                          {currentView === "exam-details" &&
                            selectedExamDetails && (
                              <ExamDetails
                                examResult={selectedExamDetails}
                                questions={getAllQuestions()}
                                onBack={() => setCurrentView("progress")}
                                onToggleFavorite={handleToggleFavorite}
                                isFavoriteQuestion={isFavoriteQuestion}
                              />
                            )}
                          {currentView === "exam" &&
                            !isActive &&
                            !showScore && (
                              <ExamSelectionScreen
                                certifications={certifications}
                                certificationBanks={certificationBanks}
                                selectedCertification={selectedCertification}
                                selectedExamId={selectedExamId}
                                studyMode={studyMode}
                                selectedDomains={selectedDomains}
                                selectedCategories={selectedCategories}
                                checkingTerms={checkingTerms}
                                termsAccepted={termsAccepted}
                                isLoadingQuestions={isLoadingQuestions}
                                onSelectCertification={(id) => {
                                  setSelectedCertification(id);
                                  setSelectedExamId("");
                                  setSelectedDomains([]);
                                  setSelectedCategories([]);
                                }}
                                onSelectStudyMode={setStudyMode}
                                onSelectBank={(bankId) => {
                                  setSelectedExamId(bankId);
                                  setSelectedSimulado([]);
                                }}
                                onAddDomain={(d) =>
                                  setSelectedDomains((prev) => [...prev, d])
                                }
                                onRemoveDomain={(d) =>
                                  setSelectedDomains((prev) =>
                                    prev.filter((x) => x !== d),
                                  )
                                }
                                onAddCategory={(c) =>
                                  setSelectedCategories((prev) => [...prev, c])
                                }
                                onRemoveCategory={(c) =>
                                  setSelectedCategories((prev) =>
                                    prev.filter((x) => x !== c),
                                  )
                                }
                                onStartExam={startExam}
                                onRecheckTerms={handleRecheckTerms}
                                getDomainName={getDomainName}
                              />
                            )}
                        </Suspense>

                        {showScore && currentView === "exam" && (
                          <ExamScoreScreen
                            score={score}
                            totalQuestions={selectedSimulado.length}
                            studyMode={studyMode}
                            endMessage={endMessage}
                            simulatedExam={simulatedExam}
                            currentExamResult={currentExamResult}
                            allAnswers={allAnswers}
                            selectedSimulado={selectedSimulado}
                            onResetExam={resetExam}
                            onRetryExam={startExam}
                            onViewExamDetails={handleViewExamDetails}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ACTIVE EXAM VIEW (Focus Mode) - FULLY CENTERED */}
            {isActive && !showScore && (
              <div
                ref={activeExamRef}
                className={`flex flex-col lg:flex-row gap-8 w-full max-w-full mx-auto items-stretch animate-in fade-in duration-500 scroll-mt-24 ${isFullscreen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-12" : ""}`}
              >
                {/* Exam Navigation Panel */}
                {isSidebarOpen && (
                  <div className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1 sm:order-2">
                    <div className={isFullscreen ? "" : "sticky top-4"}>
                      <QuestionNavigationPanel
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={selectedSimulado.length}
                        questionStatuses={questionStatuses}
                        onQuestionSelect={handleQuestionSelect}
                        onPreviousQuestion={handleKeyboardPreviousQuestion}
                        onNextQuestion={handleKeyboardNextQuestion}
                        canNavigatePrevious={currentQuestionIndex > 0}
                        canNavigateNext={
                          currentQuestionIndex < selectedSimulado.length - 1
                        }
                        studyMode={studyMode}
                        isCompact={false}
                      />
                    </div>
                  </div>
                )}

                {/* Question Area */}
                <div
                  className={`flex-1 min-w-0 order-1 lg:order-2 sm:order-1 w-full`}
                >
                  <Card className="glass-card border-none shadow-2xl rounded-[2rem] overflow-hidden">
                    <CardHeader className="space-y-4 pb-4 pt-8 px-8 border-b border-border/10 bg-muted/5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hidden lg:flex flex-shrink-0 shadow-sm"
                            title={
                              isSidebarOpen
                                ? "Ocultar Navegação"
                                : "Mostrar Navegação"
                            }
                          >
                            {isSidebarOpen ? (
                              <PanelLeftClose className="w-4 h-4" />
                            ) : (
                              <PanelLeftOpen className="w-4 h-4" />
                            )}
                          </Button>
                          <div className="space-y-1">
                            {/* TODO: Colocar o nome do exame aqui  */}
                            {/* <CardTitle className="text-2xl md:text-3xl font-extrabold text-gradient">
                              AWS Cloud Practitioner
                            </CardTitle> */}
                            {studyMode === "exam" && (
                              <div className="flex items-center gap-2 text-gray-600 font-mono text-lg font-bold">
                                <Timer className="w-4 h-4" />
                                {formatTime(timeLeft)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-sm px-3 py-1 font-semibold border-border/20"
                          >
                            Questão {currentQuestionIndex + 1} de{" "}
                            {selectedSimulado.length}
                          </Badge>
                          {currentQuestion && (
                            <Badge
                              variant="secondary"
                              className="text-sm px-3 py-1 font-semibold"
                            >
                              {currentQuestion.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Progress value={progress} className="h-1.5" />
                    </CardHeader>

                    <CardContent className="p-6 md:p-8">
                      {currentView === "exam" &&
                        isActive &&
                        currentQuestion && (
                          <ActiveExamView
                            currentQuestion={currentQuestion}
                            currentOptions={currentOptions}
                            correctOptions={correctOptions}
                            incorrectOptions={incorrectOptions}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={selectedSimulado.length}
                            selectedAnswers={selectedAnswers}
                            showExplanation={showExplanation}
                            answerStatus={answerStatus}
                            studyMode={studyMode}
                            isFullscreen={isFullscreen}
                            isFavorite={isFavoriteQuestion(currentQuestion.id)}
                            onAnswerToggle={handleAnswerToggle}
                            onSelectSingleAnswer={(id) =>
                              setSelectedAnswers([id])
                            }
                            onSubmitAnswers={handleSubmitAnswers}
                            onNextQuestion={handleNextQuestion}
                            onPreviousQuestion={handleKeyboardPreviousQuestion}
                            onSkipQuestion={handleSkipQuestion}
                            onToggleFavorite={() =>
                              handleToggleFavorite(currentQuestion.id)
                            }
                            onToggleFullscreen={toggleFullscreen}
                            onOpenShortcuts={() => setShowShortcutsModal(true)}
                            getButtonVariant={getButtonVariant}
                          />
                        )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Resume Dialog Logic (Matched to user screenshot) */}
            {/* Resume dialog */}
            {showResumeDialog && savedExamData && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-full max-w-md mx-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="h-5 w-5" /> Exame em Andamento
                    </CardTitle>
                    <CardDescription>
                      Encontramos um exame que você estava fazendo. Deseja
                      continuar de onde parou?
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

            {/* Footer Terms */}
            <div className="mt-12 pt-8 border-t border-border/10 text-center">
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Ao usar este simulador, você concorda com nossos
              </p>
              <TermsNavigationLinks variant="inline" className="text-xs" />
            </div>
          </div>
        </div>

        <KeyboardShortcutsModal
          isOpen={showShortcutsModal}
          onClose={() => setShowShortcutsModal(false)}
        />
      </TermsVersionManager>
    </TooltipProvider>
  );
};

export default ExamSimulator;
