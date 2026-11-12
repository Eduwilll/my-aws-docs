import React, { type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ExamSimulator from "./ExamSimulator";
import { loadQuestionBank } from "@/lib/utils/questionLoader";
import type { Question } from "@/lib/types/questions";

vi.mock("@/components/TermsVersionManager", () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));
vi.mock("@/lib/terms", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/terms")>()),
  hasValidConsent: vi.fn(async () => true),
}));
vi.mock("@/lib/utils/questionLoader", () => ({
  loadQuestionBank: vi.fn(),
  questionBankEstimates: { "CLF-C02-FULL": 3 },
}));

const questions: Question[] = [1, 2, 3].map((index) => ({
  id: `focus-${index}`,
  text: `Questão de foco ${index}`,
  type: "single_choice",
  category: "cloud_concepts",
  dominio: index === 3 ? "DOMAIN_2" : "DOMAIN_1",
  difficulty: "easy",
  references: [],
  options: [
    {
      id: `correct-${index}`,
      text: `Opção correta ${index}`,
      isCorrect: true,
      explanation: `Explicação da questão ${index}`,
    },
    {
      id: `wrong-${index}`,
      text: `Opção incorreta ${index}`,
      isCorrect: false,
      explanation: "Explicação incorreta",
    },
  ],
}));

beforeEach(() => {
  localStorage.clear();
  HTMLElement.prototype.scrollIntoView = vi.fn();
  vi.mocked(loadQuestionBank).mockResolvedValue(questions);
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

async function selectFocus() {
  await screen.findByText("AWS Certified Cloud Practitioner");
  fireEvent.click(screen.getByText("AWS Certified Cloud Practitioner"));
  fireEvent.click(screen.getByText("Foco Direcionado"));
  fireEvent.keyDown(screen.getAllByRole("combobox")[0], { key: "Enter" });
  fireEvent.click(screen.getByRole("option", { name: "Conceitos de Nuvem" }));
}
async function startFocus() {
  await waitFor(() =>
    expect(
      screen
        .getByRole("button", { name: "Iniciar Estudo Focado" })
        .hasAttribute("disabled"),
    ).toBe(false),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Iniciar Estudo Focado" }),
  );
  await screen.findByText("Questão de foco 1");
}

it("shows practice-style feedback after a focused answer while retaining domain filters", async () => {
  render(<ExamSimulator />);
  await selectFocus();
  await startFocus();
  expect(screen.getAllByText("Questão 1 de 2").length).toBeGreaterThan(0);
  fireEvent.click(screen.getByRole("button", { name: /Opção correta 1/ }));
  fireEvent.click(screen.getByRole("button", { name: /Verificar Resposta/ }));
  expect(screen.getByText("Resposta Correta")).toBeTruthy();
  expect(screen.getByText("Explicação da questão 1")).toBeTruthy();
  expect(screen.queryByText("Questão de foco 2")).toBeNull();
  expect(screen.queryByRole("timer")).toBeNull();
});

it("can defer focused feedback and counts the final submitted answer", async () => {
  render(<ExamSimulator />);
  await selectFocus();
  fireEvent.click(
    screen.getByRole("checkbox", {
      name: "Mostrar feedback após cada resposta",
    }),
  );
  await startFocus();
  fireEvent.click(screen.getByRole("button", { name: /Opção correta 1/ }));
  fireEvent.click(screen.getByRole("button", { name: /Próxima Questão/ }));
  expect(screen.getByText("Questão de foco 2")).toBeTruthy();
  expect(screen.queryByText("Resposta Correta")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: /Opção correta 2/ }));
  fireEvent.click(screen.getByRole("button", { name: /Finalizar Exame/ }));
  expect(screen.getByText("100%")).toBeTruthy();
  const progress = JSON.parse(localStorage.getItem("aws-exam-user-progress")!);
  expect(progress.recentExams[0].exam.answers["focus-2"]).toBe("correct-2");
  expect(
    progress.recentExams[0].questionAttempts.every(
      (attempt: { isCorrect: boolean }) => attempt.isCorrect,
    ),
  ).toBe(true);
});

it.each([true, false])(
  "resumes a custom focused timer with feedback=%s without resetting the countdown",
  async (feedback) => {
    const view = render(<ExamSimulator />);
    await selectFocus();
    if (!feedback)
      fireEvent.click(
        screen.getByRole("checkbox", {
          name: "Mostrar feedback após cada resposta",
        }),
      );
    fireEvent.click(screen.getByRole("checkbox", { name: "Usar cronômetro" }));
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Tempo limite (minutos)" }),
      { target: { value: "2" } },
    );
    await startFocus();
    expect(screen.getByRole("timer").textContent).toContain("2:00");
    const saved = JSON.parse(localStorage.getItem("examState")!);
    expect(saved.focusOptions).toEqual({
      showImmediateFeedback: feedback,
      timerEnabled: true,
      timeLimitMinutes: 2,
    });
    expect(saved.simulatedExam.studySettings).toMatchObject({
      timeLimit: 2,
      showImmediateFeedback: feedback,
      mode: "domain_focus",
    });
    view.unmount();
    localStorage.setItem(
      "examState",
      JSON.stringify({ ...saved, timeLeft: 37 }),
    );
    render(<ExamSimulator />);
    fireEvent.click(
      await screen.findByRole("button", { name: "Continuar Exame" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("timer").textContent).toContain("0:37"),
    );
    fireEvent.click(screen.getByRole("button", { name: /Opção correta 1/ }));
    fireEvent.click(
      screen.getByRole("button", {
        name: feedback ? /Verificar Resposta/ : /Próxima Questão/,
      }),
    );
    expect(screen.queryByText("Resposta Correta") !== null).toBe(feedback);
  },
);

it("blocks focused sessions with an invalid timer duration", async () => {
  render(<ExamSimulator />);
  await selectFocus();
  fireEvent.click(screen.getByRole("checkbox", { name: "Usar cronômetro" }));
  fireEvent.change(
    screen.getByRole("spinbutton", { name: "Tempo limite (minutos)" }),
    { target: { value: "0" } },
  );
  expect(
    screen
      .getByRole("button", { name: "Iniciar Estudo Focado" })
      .hasAttribute("disabled"),
  ).toBe(true);
  expect(screen.getByRole("alert").textContent).toContain("1 e 180");
});

it("finalizes and clears an expired focused session, preserving answers in the report", async () => {
  const view = render(<ExamSimulator />);
  await selectFocus();
  fireEvent.click(screen.getByRole("checkbox", { name: "Usar cronômetro" }));
  await startFocus();
  fireEvent.click(screen.getByRole("button", { name: /Opção correta 1/ }));
  fireEvent.click(screen.getByRole("button", { name: /Verificar Resposta/ }));
  const saved = JSON.parse(localStorage.getItem("examState")!);
  view.unmount();
  localStorage.setItem("examState", JSON.stringify({ ...saved, timeLeft: 0 }));
  render(<ExamSimulator />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Continuar Exame" }),
  );
  expect(
    await screen.findByText(
      "O tempo acabou! Sua prova foi finalizada automaticamente.",
    ),
  ).toBeTruthy();
  expect(localStorage.getItem("examState")).toBeNull();
  const progress = JSON.parse(localStorage.getItem("aws-exam-user-progress")!);
  expect(progress.recentExams).toHaveLength(1);
  expect(progress.recentExams[0].exam.score).toBe(1);
  expect(progress.recentExams[0].questionAttempts[0].isCorrect).toBe(true);
});

it.each([
  ["Prática", "Iniciar Modo de Prática", false],
  ["Exame Simulado", "Iniciar Exame Simulado", true],
])(
  "keeps %s feedback and timing unchanged",
  async (mode, startLabel, timed) => {
    render(<ExamSimulator />);
    fireEvent.click(
      await screen.findByText("AWS Certified Cloud Practitioner"),
    );
    fireEvent.click(screen.getByRole("heading", { name: mode }));
    fireEvent.click(screen.getByText("Simulado Prático 01 (65 Questões)"));
    await waitFor(() =>
      expect(
        screen
          .getByRole("button", { name: startLabel })
          .hasAttribute("disabled"),
      ).toBe(false),
    );
    fireEvent.click(screen.getByRole("button", { name: startLabel }));
    await screen.findByText("Questão de foco 1");
    expect(screen.queryByRole("timer") !== null).toBe(timed);
    if (timed) expect(screen.getByRole("timer").textContent).toContain("90:00");
    fireEvent.click(screen.getByRole("button", { name: /Opção correta 1/ }));
    fireEvent.click(
      screen.getByRole("button", {
        name: timed ? /Próxima Questão/ : /Verificar Resposta/,
      }),
    );
    expect(screen.queryByText("Resposta Correta") !== null).toBe(!timed);
  },
);
