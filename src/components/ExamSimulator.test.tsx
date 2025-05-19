import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExamSimulator from "./ExamSimulator";
import { describe, beforeEach, test, expect } from "vitest";

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
