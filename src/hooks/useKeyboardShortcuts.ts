import { useEffect, useCallback, useState } from "react";

interface KeyboardShortcutsConfig {
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSelectAnswer: (index: number) => void;
  onSubmitAnswer: () => void;
  onSkipQuestion: () => void;
  isModalOpen: boolean;
  isInputFocused: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

interface KeyboardShortcutsHook {
  showShortcutsModal: boolean;
  setShowShortcutsModal: (show: boolean) => void;
}

const KEYBOARD_SHORTCUTS = {
  navigation: {
    nextQuestion: "ArrowRight",
    previousQuestion: "ArrowLeft",
  },
  answers: {
    selectA: "1",
    selectB: "2",
    selectC: "3",
    selectD: "4",
  },
  actions: {
    submit: "Enter",
    skip: " ", // Space
    help: "?",
  },
  modal: {
    close: "Escape",
  },
} as const;

export const useKeyboardShortcuts = (
  config: KeyboardShortcutsConfig,
): KeyboardShortcutsHook => {
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  const {
    onNextQuestion,
    onPreviousQuestion,
    onSelectAnswer,
    onSubmitAnswer,
    onSkipQuestion,
    isModalOpen,
    isInputFocused,
    currentQuestionIndex,
    totalQuestions,
  } = config;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't handle shortcuts if modal is open or input is focused
      if (isModalOpen || showShortcutsModal || isInputFocused) {
        // Only handle modal close when shortcuts modal is open
        if (
          showShortcutsModal &&
          event.key === KEYBOARD_SHORTCUTS.modal.close
        ) {
          event.preventDefault();
          setShowShortcutsModal(false);
        }
        return;
      }

      // Handle help modal toggle
      if (event.key === KEYBOARD_SHORTCUTS.actions.help) {
        event.preventDefault();
        setShowShortcutsModal(true);
        return;
      }

      // Handle navigation shortcuts
      if (event.key === KEYBOARD_SHORTCUTS.navigation.nextQuestion) {
        event.preventDefault();
        // Only navigate if not on last question
        if (currentQuestionIndex < totalQuestions - 1) {
          onNextQuestion();
        }
        return;
      }

      if (event.key === KEYBOARD_SHORTCUTS.navigation.previousQuestion) {
        event.preventDefault();
        // Only navigate if not on first question
        if (currentQuestionIndex > 0) {
          onPreviousQuestion();
        }
        return;
      }

      // Handle answer selection shortcuts (1-4 keys)
      if (event.key === KEYBOARD_SHORTCUTS.answers.selectA) {
        event.preventDefault();
        onSelectAnswer(0); // First answer option (A)
        return;
      }

      if (event.key === KEYBOARD_SHORTCUTS.answers.selectB) {
        event.preventDefault();
        onSelectAnswer(1); // Second answer option (B)
        return;
      }

      if (event.key === KEYBOARD_SHORTCUTS.answers.selectC) {
        event.preventDefault();
        onSelectAnswer(2); // Third answer option (C)
        return;
      }

      if (event.key === KEYBOARD_SHORTCUTS.answers.selectD) {
        event.preventDefault();
        onSelectAnswer(3); // Fourth answer option (D)
        return;
      }

      // Handle action shortcuts
      if (event.key === KEYBOARD_SHORTCUTS.actions.submit) {
        event.preventDefault();
        onSubmitAnswer();
        return;
      }

      if (event.key === KEYBOARD_SHORTCUTS.actions.skip) {
        event.preventDefault();
        onSkipQuestion();
        return;
      }
    },
    [
      isModalOpen,
      showShortcutsModal,
      isInputFocused,
      currentQuestionIndex,
      totalQuestions,
      onNextQuestion,
      onPreviousQuestion,
      onSelectAnswer,
      onSubmitAnswer,
      onSkipQuestion,
    ],
  );

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    showShortcutsModal,
    setShowShortcutsModal,
  };
};
