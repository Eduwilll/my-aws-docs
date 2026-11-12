import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useExamTimer } from "./useExamTimer";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("counts down and expires in focused mode when enabled", () => {
  const onTimeExpired = vi.fn();
  const { result } = renderHook(() =>
    useExamTimer({
      isActive: true,
      studyMode: "domain_focus",
      enabled: true,
      initialTime: 2,
      onTimeExpired,
    }),
  );
  act(() => vi.advanceTimersByTime(1000));
  expect(result.current.timeLeft).toBe(1);
  act(() => vi.advanceTimersByTime(1000));
  expect(result.current.timeLeft).toBe(0);
  expect(onTimeExpired).toHaveBeenCalledTimes(1);
});

it("does not count down when focused timing is disabled", () => {
  const onTimeExpired = vi.fn();
  const { result } = renderHook(() =>
    useExamTimer({
      isActive: true,
      studyMode: "domain_focus",
      enabled: false,
      initialTime: 2,
      onTimeExpired,
    }),
  );
  act(() => vi.advanceTimersByTime(3000));
  expect(result.current.timeLeft).toBe(2);
  expect(onTimeExpired).not.toHaveBeenCalled();
});

it("keeps restored time when enabling a resumed custom timer", () => {
  const { result, rerender } = renderHook(
    ({ isActive, initialTime }) =>
      useExamTimer({
        isActive,
        studyMode: "domain_focus",
        enabled: true,
        initialTime,
        onTimeExpired: vi.fn(),
      }),
    { initialProps: { isActive: false, initialTime: 5400 } },
  );
  act(() => {
    result.current.setTimeLeft(37);
    rerender({ isActive: true, initialTime: 120 });
  });
  expect(result.current.timeLeft).toBe(37);
  act(() => vi.advanceTimersByTime(1000));
  expect(result.current.timeLeft).toBe(36);
});
