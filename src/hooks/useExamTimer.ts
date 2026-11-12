import { useState, useEffect } from "react";

/**
 * Custom hook that manages the countdown timer for enabled study sessions.
 * Returns the current time left (in seconds), a formatter, and a setter.
 */
export function useExamTimer({
  isActive,
  studyMode,
  enabled = studyMode === "exam",
  initialTime = 90 * 60,
  onTimeExpired,
}: {
  isActive: boolean;
  studyMode: string;
  enabled?: boolean;
  initialTime?: number;
  onTimeExpired: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Update idle defaults without overwriting a resumed active countdown.
  useEffect(() => {
    if (!isActive) setTimeLeft(initialTime);
  }, [initialTime, isActive]);

  useEffect(() => {
    if (!isActive || !enabled) return;

    if (timeLeft <= 0) {
      onTimeExpired();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, enabled, timeLeft, onTimeExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return { timeLeft, setTimeLeft, formatTime };
}
