import { useState, useEffect } from "react";
import type {
  UserProgress,
  DetailedExamResult,
  FavoriteQuestion,
  QuestionAttempt,
  ExamCategory,
} from "@/lib/types/questions";
import type { ExamDomainKey } from "@/lib/types/exam-domains";

const STORAGE_KEY = "aws-exam-user-progress";

export const useUserProgress = (userId: string) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window === "undefined") {
      return {
        userId,
        examsTaken: 0,
        averageScore: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        categoryScores: {},
        domainScores: {},
        recentExams: [],
        favoriteQuestions: [],
        weakAreas: [],
        studyStreak: {
          current: 0,
          longest: 0,
        },
      };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return {
        ...parsed,
        recentExams:
          parsed.recentExams?.map((exam: any) => ({
            ...exam,
            exam: {
              ...exam.exam,
              startTime: new Date(exam.exam.startTime),
              endTime: exam.exam.endTime
                ? new Date(exam.exam.endTime)
                : undefined,
            },
            questionAttempts: exam.questionAttempts?.map((attempt: any) => ({
              ...attempt,
              timestamp: new Date(attempt.timestamp),
            })),
          })) || [],
        favoriteQuestions:
          parsed.favoriteQuestions?.map((fav: any) => ({
            ...fav,
            markedAt: new Date(fav.markedAt),
            lastReviewed: fav.lastReviewed
              ? new Date(fav.lastReviewed)
              : undefined,
          })) || [],
        studyStreak: {
          ...parsed.studyStreak,
          lastStudyDate: parsed.studyStreak?.lastStudyDate
            ? new Date(parsed.studyStreak.lastStudyDate)
            : undefined,
        },
      };
    }

    return {
      userId,
      examsTaken: 0,
      averageScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      categoryScores: {},
      domainScores: {},
      recentExams: [],
      favoriteQuestions: [],
      weakAreas: [],
      studyStreak: {
        current: 0,
        longest: 0,
      },
    };
  });

  // Save to localStorage whenever userProgress changes
  useEffect(() => {
    // Only save to localStorage if we're in the browser
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    }
  }, [userProgress]);

  const addExamResult = (examResult: DetailedExamResult) => {
    setUserProgress((prev) => {
      const newRecentExams = [examResult, ...prev.recentExams].slice(0, 10); // Keep last 10 exams

      // Update category scores
      const newCategoryScores = { ...prev.categoryScores };
      Object.entries(examResult.categoryBreakdown).forEach(
        ([category, stats]) => {
          if (stats) {
            const existing = newCategoryScores[category as ExamCategory] || {
              correct: 0,
              total: 0,
              percentage: 0,
            };
            newCategoryScores[category as ExamCategory] = {
              correct: existing.correct + stats.correct,
              total: existing.total + stats.total,
              percentage:
                ((existing.correct + stats.correct) /
                  (existing.total + stats.total)) *
                100,
              lastAttempt: new Date(),
            };
          }
        },
      );

      // Update domain scores
      const newDomainScores = { ...prev.domainScores };
      Object.entries(examResult.domainBreakdown).forEach(([domain, stats]) => {
        const existing = newDomainScores[domain] || {
          correct: 0,
          total: 0,
          percentage: 0,
        };
        newDomainScores[domain] = {
          correct: existing.correct + stats.correct,
          total: existing.total + stats.total,
          percentage:
            ((existing.correct + stats.correct) /
              (existing.total + stats.total)) *
            100,
          lastAttempt: new Date(),
        };
      });

      // Update study streak
      const today = new Date();
      const lastStudy = prev.studyStreak.lastStudyDate;
      let newStreak = prev.studyStreak;

      if (!lastStudy || isNewDay(lastStudy, today)) {
        if (lastStudy && isConsecutiveDay(lastStudy, today)) {
          newStreak = {
            current: prev.studyStreak.current + 1,
            longest: Math.max(
              prev.studyStreak.longest,
              prev.studyStreak.current + 1,
            ),
            lastStudyDate: today,
          };
        } else {
          newStreak = {
            current: 1,
            longest: Math.max(prev.studyStreak.longest, 1),
            lastStudyDate: today,
          };
        }
      }

      // Calculate weak areas
      const weakAreas = calculateWeakAreas(newCategoryScores, newDomainScores);

      const totalCorrect = examResult.questionAttempts.filter(
        (q) => q.isCorrect,
      ).length;
      const totalQuestions = examResult.questionAttempts.length;

      return {
        ...prev,
        examsTaken: prev.examsTaken + 1,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + totalQuestions,
        totalCorrectAnswers: prev.totalCorrectAnswers + totalCorrect,
        averageScore:
          ((prev.totalCorrectAnswers + totalCorrect) /
            (prev.totalQuestionsAnswered + totalQuestions)) *
          100,
        categoryScores: newCategoryScores,
        domainScores: newDomainScores,
        recentExams: newRecentExams,
        weakAreas,
        studyStreak: newStreak,
      };
    });
  };

  const addFavoriteQuestion = (
    questionId: string,
    examId: string,
    notes?: string,
  ) => {
    setUserProgress((prev) => {
      const existing = prev.favoriteQuestions.find(
        (fav) => fav.questionId === questionId,
      );
      if (existing) {
        return prev; // Already favorited
      }

      const newFavorite: FavoriteQuestion = {
        questionId,
        examId,
        markedAt: new Date(),
        notes,
        reviewCount: 0,
      };

      return {
        ...prev,
        favoriteQuestions: [...prev.favoriteQuestions, newFavorite],
      };
    });
  };

  const removeFavoriteQuestion = (questionId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      favoriteQuestions: prev.favoriteQuestions.filter(
        (fav) => fav.questionId !== questionId,
      ),
    }));
  };

  const updateFavoriteQuestion = (questionId: string, notes?: string) => {
    setUserProgress((prev) => ({
      ...prev,
      favoriteQuestions: prev.favoriteQuestions.map((fav) =>
        fav.questionId === questionId
          ? {
              ...fav,
              notes,
              reviewCount: fav.reviewCount + 1,
              lastReviewed: new Date(),
            }
          : fav,
      ),
    }));
  };

  const isFavoriteQuestion = (questionId: string): boolean => {
    return userProgress.favoriteQuestions.some(
      (fav) => fav.questionId === questionId,
    );
  };

  const getFavoriteQuestion = (
    questionId: string,
  ): FavoriteQuestion | undefined => {
    return userProgress.favoriteQuestions.find(
      (fav) => fav.questionId === questionId,
    );
  };

  const clearAllProgress = () => {
    setUserProgress({
      userId,
      examsTaken: 0,
      averageScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      categoryScores: {},
      domainScores: {},
      recentExams: [],
      favoriteQuestions: [],
      weakAreas: [],
      studyStreak: {
        current: 0,
        longest: 0,
      },
    });
  };

  return {
    userProgress,
    addExamResult,
    addFavoriteQuestion,
    removeFavoriteQuestion,
    updateFavoriteQuestion,
    isFavoriteQuestion,
    getFavoriteQuestion,
    clearAllProgress,
  };
};

// Helper functions
const isNewDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() !== date2.toDateString();
};

const isConsecutiveDay = (lastDate: Date, currentDate: Date): boolean => {
  const diffTime = currentDate.getTime() - lastDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

const calculateWeakAreas = (categoryScores: any, domainScores: any) => {
  const weakAreas: any[] = [];

  // Find categories with < 70% success rate and at least 5 attempts
  Object.entries(categoryScores).forEach(([category, stats]: [string, any]) => {
    if (stats.total >= 5 && stats.percentage < 70) {
      weakAreas.push({
        category: category as ExamCategory,
        domain: "", // Will be filled by domain analysis
        incorrectCount: stats.total - stats.correct,
        totalAttempts: stats.total,
      });
    }
  });

  return weakAreas.slice(0, 5); // Top 5 weak areas
};
