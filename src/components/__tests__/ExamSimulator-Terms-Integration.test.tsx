import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ExamSimulator from "../ExamSimulator";
import { describe, beforeEach, test, expect, vi } from "vitest";
import * as termsModule from "@/lib/terms";

describe("ExamSimulator - Terms Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("shows terms required notice when terms not accepted", async () => {
    // Mock hasValidConsent to return false
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(false);

    render(<ExamSimulator />);

    // Wait for terms check to complete and verify terms required notice appears
    await waitFor(
      () => {
        expect(
          screen.getByText("Termos de Serviço Requeridos"),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Should show warning message
    expect(
      screen.getByText(
        "Você deve aceitar nossos Termos de Serviço antes de iniciar o exame.",
      ),
    ).toBeInTheDocument();

    mockHasValidConsent.mockRestore();
  });

  test("allows exam interface when terms are accepted", async () => {
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
      { timeout: 3000 },
    );

    // Should not show terms required notice
    expect(
      screen.queryByText("Termos de Serviço Requeridos"),
    ).not.toBeInTheDocument();

    // Should show exam selection interface
    expect(
      screen.getByText("Bem-vindo ao Simulador de Exame da AWS"),
    ).toBeInTheDocument();

    mockHasValidConsent.mockRestore();
  });

  test("includes TermsVersionManager wrapper", () => {
    // Mock hasValidConsent to return true
    const mockHasValidConsent = vi
      .spyOn(termsModule, "hasValidConsent")
      .mockResolvedValue(true);

    render(<ExamSimulator />);

    // The component should render without errors, indicating TermsVersionManager is properly integrated
    expect(screen.getByText("AWS Cloud Practitioner")).toBeInTheDocument();

    mockHasValidConsent.mockRestore();
  });
});
