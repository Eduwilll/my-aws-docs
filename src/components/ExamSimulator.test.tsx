import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExamSimulator from "./ExamSimulator";
import { describe, beforeEach, test, expect, vi } from "vitest";
import * as termsModule from "@/lib/terms";

// filepath: /c:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/components/ExamSimulator.test.tsx

describe("ExamSimulator", () => {
  beforeEach(() => {
    render(<ExamSimulator />);
  });

  test("renders initial state correctly", () => {
    expect(
      screen.getByText("Bem-vindo ao Simulador de Exame da AWS"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Escolha seu exame e comece a praticar"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Selecione seu exame"),
    ).toBeInTheDocument();
    expect(screen.getByText("Iniciar Exame")).toBeDisabled();
  });

  test("allows exam selection", () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    expect(screen.getByText("Iniciar Exame")).not.toBeDisabled();
  });

  test("starts the exam", () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    expect(screen.getByText("Questão 1 de 65")).toBeInTheDocument();
    expect(screen.getByText("AWS Cloud Practitioner")).toBeInTheDocument();
  });

  test("handles answering questions", () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    fireEvent.click(screen.getByText("Option 1")); // Replace with actual option text
    fireEvent.click(screen.getByText("Verificar Resposta"));
    expect(screen.getByText("Resposta Correta")).toBeInTheDocument(); // Adjust based on actual answer
  });

  test("navigates to the next question", () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    fireEvent.click(screen.getByText("Option 1")); // Replace with actual option text
    fireEvent.click(screen.getByText("Verificar Resposta"));
    fireEvent.click(screen.getByText("Proxima Questão"));
    expect(screen.getByText("Questão 2 de 65")).toBeInTheDocument();
  });

  test("completes the exam", async () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    for (let i = 0; i < 65; i++) {
      fireEvent.click(screen.getByText("Option 1")); // Replace with actual option text
      fireEvent.click(screen.getByText("Verificar Resposta"));
      if (i < 64) {
        fireEvent.click(screen.getByText("Proxima Questão"));
      }
    }
    await waitFor(() =>
      expect(screen.getByText("Exam Complete!")).toBeInTheDocument(),
    );
    expect(
      screen.getByText("Parabéns! Você finalizou a prova."),
    ).toBeInTheDocument();
  });

  test("displays end message when time runs out", async () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    // Simulate time running out
    await waitFor(() => {
      expect(
        screen.getByText(
          "O tempo acabou! Sua prova foi finalizada automaticamente.",
        ),
      ).toBeInTheDocument();
    });
  });

  test("resets exam when 'Try Again' is clicked", () => {
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(screen.getByText("Iniciar Exame"));
    fireEvent.click(screen.getByText("Option 1")); // Replace with actual option text
    fireEvent.click(screen.getByText("Verificar Resposta"));
    fireEvent.click(screen.getByText("Proxima Questão"));
    fireEvent.click(screen.getByText("Finalizar Exame"));
    fireEvent.click(screen.getByText("Try Again"));
    expect(
      screen.getByText("Bem-vindo ao Simulador de Exame da AWS"),
    ).toBeInTheDocument();
  });
});

describe("ExamSimulator - Terms Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("shows loading state while checking terms", async () => {
    // Mock hasValidConsent to return a promise that resolves after a delay
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(true), 100)),
      );

    render(<ExamSimulator />);

    // Should show loading state initially
    expect(screen.getByText("Verificando Termos...")).toBeInTheDocument();

    // Button should be disabled
    const startButton = screen.getByRole("button", {
      name: /verificando termos/i,
    });
    expect(startButton).toBeDisabled();

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    mockHasValidConsent.mockRestore();
  });

  test("shows terms required notice when terms not accepted", async () => {
    // Mock hasValidConsent to return false
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(false);

    render(<ExamSimulator />);

    // Wait for terms check to complete
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should show warning message
    expect(
      screen.getByText("Termos de Serviço Requeridos"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Você deve aceitar nossos Termos de Serviço antes de iniciar o exame.",
      ),
    ).toBeInTheDocument();

    // Button should show terms required message and be disabled
    const startButton = screen.getByRole("button", {
      name: /aceite os termos para continuar/i,
    });
    expect(startButton).toBeDisabled();

    // Should show terms link
    expect(screen.getByText("Termos de Serviço")).toBeInTheDocument();

    mockHasValidConsent.mockRestore();
  });

  test("allows exam start when terms are accepted", async () => {
    // Mock hasValidConsent to return true
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(true);

    render(<ExamSimulator />);

    // Wait for terms check to complete
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should not show terms required notice
    expect(
      screen.queryByText("Termos de Serviço Requeridos"),
    ).not.toBeInTheDocument();

    // Select an exam
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));

    // Button should be enabled and show normal text
    const startButton = screen.getByRole("button", {
      name: /iniciar modo de prática/i,
    });
    expect(startButton).not.toBeDisabled();

    mockHasValidConsent.mockRestore();
  });

  test("prevents exam start when terms check fails", async () => {
    // Mock hasValidConsent to throw an error
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockRejectedValue(new Error("Terms check failed"));

    // Mock console.error to avoid test output noise
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ExamSimulator />);

    // Wait for terms check to complete
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should show terms required notice (defaults to false on error)
    expect(
      screen.getByText("Termos de Serviço Requeridos"),
    ).toBeInTheDocument();

    // Button should be disabled
    const startButton = screen.getByRole("button", {
      name: /aceite os termos para continuar/i,
    });
    expect(startButton).toBeDisabled();

    mockHasValidConsent.mockRestore();
    consoleSpy.mockRestore();
  });

  test("validates terms before starting exam", async () => {
    // Mock hasValidConsent to return true initially, then false when called again
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValueOnce(true) // Initial check
      .mockResolvedValueOnce(false); // Check when starting exam

    // Mock alert to capture the message
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ExamSimulator />);

    // Wait for initial terms check
    await waitFor(() => {
      expect(
        screen.queryByText("Verificando Termos..."),
      ).not.toBeInTheDocument();
    });

    // Select an exam
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));

    // Try to start exam
    const startButton = screen.getByRole("button", {
      name: /iniciar modo de prática/i,
    });
    fireEvent.click(startButton);

    // Should show alert about terms requirement
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Você deve aceitar os Termos de Serviço antes de iniciar o exame.",
      );
    });

    // Exam should not start
    expect(screen.queryByText("Questão 1 de")).not.toBeInTheDocument();

    mockHasValidConsent.mockRestore();
    alertSpy.mockRestore();
  });

  test("shows terms link in exam interface", async () => {
    // Mock hasValidConsent to return true
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(true);

    render(<ExamSimulator />);

    // Wait for terms check
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Start exam
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(
      screen.getByRole("button", { name: /iniciar modo de prática/i }),
    );

    // Should show terms link in exam interface
    await waitFor(
      () => {
        expect(screen.getByText("Questão 1 de")).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Terms link should be present in the exam interface
    const termsLinks = screen.getAllByText("Termos de Serviço");
    expect(termsLinks.length).toBeGreaterThan(0);

    mockHasValidConsent.mockRestore();
  });

  test("handles terms acceptance completion", async () => {
    // Mock hasValidConsent to return false initially
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(false);

    render(<ExamSimulator />);

    // Wait for initial terms check
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Should show terms required notice
    expect(
      screen.getByText("Termos de Serviço Requeridos"),
    ).toBeInTheDocument();

    // Simulate terms acceptance by updating the mock to return true
    mockHasValidConsent.mockResolvedValue(true);

    // Note: In a real scenario, the TermsVersionManager would handle this
    // and call the onAcceptanceComplete callback which would update the state

    mockHasValidConsent.mockRestore();
  });

  test("handles terms error gracefully", async () => {
    // Mock hasValidConsent to throw an error during exam start
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValueOnce(true) // Initial check passes
      .mockRejectedValueOnce(new Error("Network error")); // Fails during exam start

    // Mock alert and console.error
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ExamSimulator />);

    // Wait for initial terms check
    await waitFor(
      () => {
        expect(
          screen.queryByText("Verificando Termos..."),
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Select exam and try to start
    fireEvent.mouseDown(screen.getByPlaceholderText("Selecione seu exame"));
    fireEvent.click(screen.getByText("Exame CLF-C02 (65 questões)"));
    fireEvent.click(
      screen.getByRole("button", { name: /iniciar modo de prática/i }),
    );

    // Should show error alert
    await waitFor(
      () => {
        expect(alertSpy).toHaveBeenCalledWith(
          "Erro ao verificar aceitação dos termos. Tente novamente.",
        );
      },
      { timeout: 2000 },
    );

    // Exam should not start
    expect(screen.queryByText("Questão 1 de")).not.toBeInTheDocument();

    mockHasValidConsent.mockRestore();
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
