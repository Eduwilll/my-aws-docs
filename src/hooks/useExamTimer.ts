import { useState, useEffect } from "react";

/**
 * Custom hook that manages the countdown timer for exam mode.
 * Returns the current time left (in seconds), a formatter, and a setter.
 */
export function useExamTimer({
  isActive,
  studyMode,
  initialTime = 90 * 60,
  onTimeExpired,
}: {
  isActive: boolean;
  studyMode: string;
  initialTime?: number;
  onTimeExpired: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Reset the timer when a new exam starts
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || studyMode !== "exam") return;

    if (timeLeft <= 0) {
      onTimeExpired();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, studyMode, timeLeft, onTimeExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return { timeLeft, setTimeLeft, formatTime };
}
